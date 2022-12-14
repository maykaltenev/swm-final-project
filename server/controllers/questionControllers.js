import express from "express";
import { QuestionData } from "../models/questions.js";
import UserSolution from "../models/userSolutions.js";
import QuizSession from "../models/quizSession.js";
//creating question data
export const createJsQuestions = async (req, res) => {
  try {
    const createQuestion = await QuestionData.create(req.body);
    return res
      .status(201)
      .json({ message: "Question created", createQuestion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//drop questiondata collection
export const removeJsCollection = async (req, res) => {
  try {
    const deleted = await QuestionData.remove();
    return res.status(201).json({ message: "Deleted ", deleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getAllJSQuestions = async (req, res) => {
//     try {
//         const QuestionData = await QuestionData.find();
//         return res.status(201).json({ message: "JavaScript Questions found", QuestionData });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

//get all questions from db wrt sessionId
export const getAllQuestionsBySession = async (req, res) => {
  const sessionId = req.params.id;
  try {
    //find the sessionId in quizsession collection
    const data = await QuizSession.findById(sessionId);
    return res
      .status(201)
      .json({ message: "All Session Questions found", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//create a quiz session
export const createQuizSession = async (req, res) => {
  //get user, usersolution array , questiontype and level from the frontend
  const { user, userSolution, questionType, level } = req.body;
  //find the questions in questionData according to questiontype(mern) & difficulty level (beginner , intermediate, advanced)
  const questions = await QuestionData.find({
    questionType: questionType,
    difficultyLevel: level,
  });
  //create q new quiz session for the user logged in, questionand usersolution array
  try {
    const newQuizSession = await QuizSession.create({
      user,
      questions,
      userSolution,
    });
    //if already there is newquiz session just return
    if (!newQuizSession) return;

    return res
      .status(200)
      .json({ message: "New Quiz Session Created", newQuizSession });
  } catch (error) {
    return res.send(error.message);
  }
};
//creating mixquiz question according to the user question type and level selection
export const createMixQuizSession = async (req, res) => {
  //get user, usersolution array , mixQuestionType from the frontend
  const { user, userSolution, mixQuestionType } = req.body;
  //array to have the mix of questions
  let questions = [];
  if (mixQuestionType) {
    if (mixQuestionType.length === 1) {
      const firstType = mixQuestionType[0][0];
      const firstLevel = mixQuestionType[0][1];
      //find questions according to the type and level from questiondat
      let questionsAll = await QuestionData.find({
        questionType: firstType,
        difficultyLevel: firstLevel,
      });

      //randomizing the questions
      while (questions.length < 5) {
        let randomQues = Math.floor(Math.random() * questionsAll.length);
        if (!questions.includes(questionsAll[randomQues])) {
          questions.push(questionsAll[randomQues]);
        }
      }
    } else if (mixQuestionType.length === 2) {
      const firstType = mixQuestionType[0][0];
      const firstLevel = mixQuestionType[0][1];
      const secondType = mixQuestionType[1][0];
      const secondLevel = mixQuestionType[1][1];
      let questionsAll = await QuestionData.find({
        $or: [
          {
            $and: [
              { questionType: firstType },
              { difficultyLevel: firstLevel },
            ],
          },
          {
            $and: [
              { questionType: secondType },
              { difficultyLevel: secondLevel },
            ],
          },
        ],
      });

      /* to randomise the questions to create mix  of ques  */
      while (questions.length < 10) {
        let randomQues = Math.floor(Math.random() * questionsAll.length);
        if (!questions.includes(questionsAll[randomQues])) {
          questions.push(questionsAll[randomQues]);
        }
      }
    } else {
      const firstType = mixQuestionType[0][0];
      const firstLevel = mixQuestionType[0][1];
      const secondType = mixQuestionType[1][0];
      const secondLevel = mixQuestionType[1][1];
      const thirdType = mixQuestionType[2][0];
      const thirdLevel = mixQuestionType[2][1];

      const questionsAll = await QuestionData.find({
        $or: [
          {
            $and: [
              { questionType: firstType },
              { difficultyLevel: firstLevel },
            ],
          },
          {
            $and: [
              { questionType: secondType },
              { difficultyLevel: secondLevel },
            ],
          },
          {
            $and: [
              { questionType: thirdType },
              { difficultyLevel: thirdLevel },
            ],
          },
        ],
      });
      /* to randomise the questions to create mix  of ques  */
      while (questions.length < 15) {
        let randomQues = Math.floor(Math.random() * questionsAll.length);
        if (!questions.includes(questionsAll[randomQues])) {
          questions.push(questionsAll[randomQues]);
        }
      }
    }

    try {
      let newQuizSession = await QuizSession.create({
        user,
        questions,
        userSolution,
      });

      if (!newQuizSession) return;

      return res
        .status(200)
        .json({ message: "New Quiz Session Created", newQuizSession });
    } catch (error) {
      return res.send(error.message);
    }
  }
};
//creating userresponse details
export const createUserResponse = async (req, res) => {
  try {
    //getting the user,question,answerand the sessionId from frontend
    const { answer, user, question, sessionId } = req.body;
    //finding the session id and the question on the userSolutions
    const session = await QuizSession.findOne({
      _id: sessionId,
      "userSolutions.question": question,
    });
    //if session exist, and if there is already an answer, just update this new answer to userSolutions-answer
    if (session) {
      const updatedSession = await QuizSession.findOneAndUpdate(
        { _id: sessionId, "userSolutions.question": question },
        {
          //setting a specific field to a new value
          $set: {
            //userSolutions.$ is the solution we found using findOne
            "userSolutions.$.answer": answer,
          },
        },
        { new: true }
      );

      return res.status(200).json(updatedSession);
    }
    ////if session exist, and if there is no answer exist, push question and the user selected answer to user solutions array
    const answerFromTheUser = await QuizSession.findByIdAndUpdate(
      sessionId,
      {
        $push: {
          userSolutions: { question, answer },
        },
      },
      { new: true }
    );

    return res.status(200).json(answerFromTheUser);
  } catch (error) {
    return res.send(error.message);
  }
};
//creating result
export const createResult = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await QuizSession.findOne({
      _id: sessionId,
    });
    if (session) {
      // Collect all the user answers
      const checkResult = await QuizSession.findById(sessionId).select(
        "userSolutions"
      );

      // Get all the question for this session
      const allQuestion = await QuizSession.findById(sessionId).select(
        "questions"
      );
      const resultArray = [];

      const userCorrectAnswerAll = []; // 2
      const userWrongAnswerAll = [];

      // Iterate over all the questions object
      allQuestion.questions.map((question) => {
        // Iterate over all the the userSolutions object
        checkResult.userSolutions.map((solutions) => {
          // Check if the current questionID is the same a the current solutionID
          if (String(solutions.question) === String(question._id)) {
            // All the correct options
            if (
              question.inputType === "radio" ||
              question.inputType === "checkbox"
            ) {
              const correctOption = question.options.filter(
                (correct) => correct.isCorrect === true
              ); // 2 // 3 // 1
              const userCorrectAnswer = []; // 2
              const userWrongAnswer = [];
              //checking the correct option and the user selected option
              question.options.map((questionOption) => {
                solutions.answer.filter((solutionInput) => {
                  if (String(questionOption._id) === String(solutionInput)) {
                    if (questionOption.isCorrect) {
                      return (
                        userCorrectAnswer.push(questionOption) &&
                        userCorrectAnswerAll.push(questionOption)
                      );
                    } else {
                      return (
                        userWrongAnswer.push(questionOption) &&
                        userWrongAnswerAll.push(questionOption)
                      );
                    }
                  }
                });
              });
              if (
                //checking and pushin the correct answer & wrong answer to the respective arrays with a property correct = true / false
                userCorrectAnswer.length === correctOption.length &&
                solutions.answer.length === correctOption.length
              ) {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 1,
                  correct: true,
                });
              } else {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,
                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 0,
                  correct: false,
                });
              }
            } else {
              // //! For inputType === "text"
              const userCorrectAnswer = [];
              const userWrongAnswer = [];
              // Correct Option
              const correctOption = question.options[0].option;
              const correct = question.options[0].option.trim().toLowerCase();
              const userInput = solutions.answer[0].trim().toLowerCase();
              if (correct === userInput) {
                userCorrectAnswer.push(solutions.answer[0]);
              } else {
                userWrongAnswer.push(solutions.answer[0]);
              }
              if (userCorrectAnswer.length > 0) {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 1,
                  correct: true,
                });
              } else {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 0,
                  correct: false,
                });
              }
            }
          }
        });
      });
      //calculating the number of correct answers in resultarray
      const correctAnswers = resultArray.reduce((acc, curr) => {
        return acc + curr.mark;
      }, 0);
      //calculating the number of wrong answers in resultarray
      const wrongAnswers = resultArray.length - correctAnswers;
      //calculating the percentage scored wrt to correct answers
      const userAnswerPercentage = Math.round(
        (correctAnswers / allQuestion.questions.length) * 100
      );
      return res.status(200).json({
        resultArray,
        allQuestion,
        correctAnswers,
        wrongAnswers,
        userAnswerPercentage,
        userCorrectAnswerAll,
        userWrongAnswerAll,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};
//get result
/* export const getResult = async (req, res) => {

  try {
    const getQuestions = await QuestionData.remove();
    return res
      .status(201)
      .json({ message: "Deleted ", deleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; */
