import express from "express";
import { QuestionData } from "../models/questions.js";
import UserSolution from "../models/userSolutions.js";
import QuizSession from "../models/quizSession.js";

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
export const getAllQuestionsBySession = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const data = await QuizSession.findById(sessionId);
    return res
      .status(201)
      .json({ message: "All Session Questions found", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createQuizSession = async (req, res) => {
  const { user, userSolution, questionType, level } = req.body;

  const questions = await QuestionData.find({
    questionType: questionType,
    difficultyLevel: level,
  });

  try {
    const newQuizSession = await QuizSession.create({
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
};
/* controller for mix-questions
 */
export const createMixQuizSession = async (req, res) => {
  //const { user, userSolution, questionType, level } = req.body;
  const mixQuestionTypes = [
    ["react", "advanced"],
    ["nodejs", "beginner"],
  ];
  /*   console.log("the length is:", mixQuestionTypes.length); */
  if (mixQuestionTypes.length === 1) {
    const questions = await QuestionData.find({
      questionType: mixQuestionTypes[0][0],
      difficultyLevel: mixQuestionTypes[0][1],
    });
  } else if (mixQuestionTypes.length === 2) {
    const firstType = mixQuestionTypes[0][0];
    const firstLevel = mixQuestionTypes[0][1];
    const secondType = mixQuestionTypes[1][0];
    const secondLevel = mixQuestionTypes[1][1];

    const questions = await QuestionData.find({
      $or: [
        {
          $and: [{ questionType: firstType }, { difficultyLevel: firstLevel }],
        },
        {
          $and: [
            { questionType: secondType },
            { difficultyLevel: secondLevel },
          ],
        },
      ],
    });
    //console.log("questions mix", questions);
    console.log("ques len", questions.length);
    const mixQuestionResultArray = [];
    while (mixQuestionResultArray.length < 10) {
      let randomQues = Math.floor(Math.random() * questions.length);
      if (!mixQuestionResultArray.includes(randomQues)) {
        mixQuestionResultArray.push(randomQues);
      }
    }
    console.log("mixarray", mixQuestionResultArray);
    console.log("mixarrayl", mixQuestionResultArray.length);
  }

  /* try {
    const newQuizSession = await QuizSession.create({
      user,
      questions,
      userSolution,
    });

    if (!newQuizSession) return;
 */
  /*  return res
      .status(200)
      .json({ message: "New Quiz Session Created", questions }); */
  /* } catch (error) {
    return res.send(error.message);
  } */
};

export const createUserResponse = async (req, res) => {
  try {
    const { answer, user, question, sessionId } = req.body;

    const session = await QuizSession.findOne({
      _id: sessionId,
      "userSolutions.question": question,
    });

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

      const correctAnswers = resultArray.reduce((acc, curr) => {
        return acc + curr.mark;
      }, 0);
      const wrongAnswers = resultArray.length - correctAnswers;

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
