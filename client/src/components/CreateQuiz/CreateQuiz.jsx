import React, { useContext, useEffect } from "react";
import { useState } from "react";
import CheckboxDropdownComponent, {
  createStyles
} from "react-checkbox-dropdown";
import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";

const options = ["React Beginner","React Intermediate","React Advanced","Javascript Beginner","Javascript Intermediate","Javascript Advanced",].map(item => ({value:item, label:item}))

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
  console.log("the value of selected option in create quiz is", checkboxValue)
  return (
    <div className = "flex justify-around">
     <div className="font-poppins">
      <CheckboxDropdownComponent
          displayText="Select your own Stack"
          options={options}
          onChange={option => {
            if (!checkboxValue.includes(option)) {
              const newValue = [...checkboxValue, option];
             setCheckboxValue(newValue);
            }
          }}
          onDeselectOption={option => {
            const filteredOptions = checkboxValue.filter(
              item => item.value !== option.value
            );
           setCheckboxValue(filteredOptions);
          }}
          value={checkboxValue}
          />
      </div> 
          {/*  displayTags 
           isStrict={false} */} 
      <select onChange={handleChangeOption}>
        <option value={""}>Select</option>
        <optgroup label="React">
        <option value="react"><input type="checkbox" />React Beginner</option>
        </optgroup>
        <option value="nodejs">Nodejs</option>
        <option value="javascript">JavaScript</option>
        <option value="express">Express</option>
        <option value="mongodb">MongoDB</option>
      </select>
      <select onChange={handleChangeOption}>
  <option value={""}>Select</option>
  <optgroup label="React">
    <option value="react"><input type="checkbox" />React Beginner</option>
  </optgroup>
  <option value="nodejs">Nodejs</option>
  <option value="javascript">JavaScript</option>
  <option value="express">Express</option>
  <option value="mongodb">MongoDB</option>
</select>
      <select>
      <optiongroup label="Fruits">
        <option>
          <input type="checkbox" /> Apple
        </option>
        <option>
          <input type="checkbox" /> Orange
        </option>
        <option>
          <input type="checkbox" /> Banana
        </option>
      </optiongroup>
      <optiongroup label="Vegetables">
        <option>
          <input type="checkbox" /> Carrot
        </option>
        <option>
          <input type="checkbox" /> Broccoli
        </option>
        <option>
          <input type="checkbox" /> Spinach
        </option>
      </optiongroup>
    </select>
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
