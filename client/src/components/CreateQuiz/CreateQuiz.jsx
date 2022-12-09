import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CheckboxDropdownComponent, {
  createStyles,
} from "react-checkbox-dropdown";
import Multiselect from "multiselect-react-dropdown";
import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";

const options = [
  "React Beginner",
  "React Intermediate",
  "React Advanced",
  "Javascript Beginner",
  "Javascript Intermediate",
  "Javascript Advanced",
].map((item) => ({ value: item, label: item }));

function CreateQuiz() {
  const [checkboxValue, setCheckboxValue] = useState([]);

  const { timer } = useContext(UserContext);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const { handleCreateNewSession, setMarked, setSessionId, setQuestionData } =
    useContext(QuestionContext);
  const handleNewQuiz = (chosenQuestionType) => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");

    setMarked([]);
    setSessionId("");
    setQuestionData([]);

    handleCreateNewSession(chosenQuestionType);
    timer();
  };
  const handleChangeOption = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") return;
    setSelectedQuestionType(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log("the value of selected option in create quiz is", checkboxValue);



  return (
    <div className="flex justify-around">
      <Multiselect
      placeholder="Select only 3"
        selectionLimit="3"
        displayValue="value"
        groupBy="label"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={[
          {
            label: "React",
            value: "React Beginner",
          },
          {
            label: "React",
            value: "React Intermediate",
          },
          {
            label: "React",
            value: "React Advanced",
          },
          {
            label: "Nodejs",
            value: "Nodejs Beginner",
          },
          {
            label: "Nodejs",
            value: "Nodejs Intermediate",
          },
          {
            label: "Nodejs",
            value: "Nodejs Advanced",
          },
          {
            label: "Expressjs",
            value: "Expressjs beginner",
          },
          {
            label: "Expressjs",
            value: "Expressjs Intermediate",
          },
          {
            label: "Expressjs",
            value: "Expressjs Advanced",
          },
          {
            label: "MongoDB",
            value: "MongoDB beginner",
          },
          {
            label: "MongoDB",
            value: "MongoDB Intermediate",
          },
          {
            label: "MongoDB",
            value: "MongoDB Advanced",
          },
        ]}
        showCheckbox        
      />
      <button
        disabled={selectedQuestionType === ""}
        className="bg-ultramarine-blue-2 rounded w-50 px-4 text-3xl h-14 text-bold text-snow hover:bg-red"
        onClick={() => handleNewQuiz(selectedQuestionType)}
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
