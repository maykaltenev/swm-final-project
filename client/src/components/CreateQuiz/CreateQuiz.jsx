import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CheckboxDropdownComponent, {
  createStyles,
} from "react-checkbox-dropdown";
import Multiselect from "multiselect-react-dropdown";
import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
import { differenceInSeconds } from "date-fns";
//images

import Setup from "../../assets/banner-tiles/setup.png";
import Box from "../../assets/banner-tiles/box.png";

import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";
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
  const {
    handleCreateMixSession,
    setMarked,
    setSessionId,
    setQuestionData,
    setCurrentQuestion,
    setTimeOver,
    setTimeDifference,
    getQuizTimeFromLocalStorage,
    duration,
  } = useContext(QuestionContext);
  const handleNewQuiz = (chosenQuestionType) => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");
    setCurrentQuestion(0);
    setTimeOver(false);
    setMarked([]);
    setSessionId("");
    setQuestionData([]);
    getQuizTimeFromLocalStorage();
    setTimeDifference(duration);

    handleCreateMixSession(chosenQuestionType);
    timer();
    handleCreateMixSession(chosenQuestionType);
  };

  // handle onChange event of the dropdown
  const onSelection = (data) => {
    const dataValue = data.map((item) => item.value.toLowerCase().split(" "));
    setSelectedQuestionType(dataValue);
  };
  console.log("selectedQuestionType", selectedQuestionType);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dark:bg-oxford-blue mt-5 w-full min-h-screen flex flex-col justify-start sm:items-start sm:justify-evenly rounded-3xl items-center sm:flex-row text-git-nav shadow-5xl dark:shadow-4xl">
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto  sm:flex sm:flex-wrap">
          <div className="sm:flex sm:flex-wrap ">
            <div className="flex flex-col items-center sm:flex-row align-center sm:justify-evenly mb-4 py-4 sm:py-0 ">
              <h1 className="sm:text-3xl  text-xl font-medium text-center title-font dark:text-snow lg:w-2/3 lg:mb-0 mb-4  text-git-nav">
                Challenge yourself and see how much you know about the MERN
                stack
              </h1>
              {/* once the user clicks this button, new quiz session is started */}
              <button
                type="button"
                disabled={selectedQuestionType.length === 0}
                className="cursor-pointer px-8 py-2 sm:px-8 sm:mr-5 sm:py-5 block h-fit text-white bg-ultramarine-blue-2 hover:bg-ultramarine-blue focus:ring-4 focus:ring-bg-ultramarine-blue   sm:font-medium rounded-lg  text-center dark:bg-ultramarine-blue dark:hover:bg-ultramarine-blue-2 dark:focus:ring-ultramarine-blue-2
              shadow-3xl hover:shadow transition duration-200"
                onClick={() => handleNewQuiz(selectedQuestionType)}
              >
                Start New Quiz
              </button>
            </div>
            {/* user can select type and level of MERN and start the mixQUes quiz */}
            <div className="sm:flex sm:flex-wrap sm:w-1/2 w-screen">
              <div
                className="md:p-2  p-1 sm:w-1/2  flex flex-col w-screen
              sm:justify-between text-justify"
              >
                {/* user can select minimum 1 type & maximum of 3 types to start the mixquestion quiz*/}
                <Multiselect
                  placeholder="Select only 3"
                  selectionLimit="3"
                  displayValue="value"
                  groupBy="label"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={function noRefCheck() {}}
                  onSearch={function noRefCheck() {}}
                  onSelect={onSelection}
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
                      label: "JS",
                      value: "Javascript Beginner",
                    },
                    {
                      label: "JS",
                      value: "Javascript Intermediate",
                    },
                    {
                      label: "JS",
                      value: "Javascript Advanced",
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
                      value: "Express Beginner",
                    },
                    {
                      label: "Expressjs",
                      value: "Express Intermediate",
                    },
                    {
                      label: "Expressjs",
                      value: "Express Advanced",
                    },
                    {
                      label: "MongoDB",
                      value: "MongoDB Beginner",
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
                <p className=" px-2  leading-relaxed text-base dark:text-snow  text-justify  text-git-nav">
                  A quiz is a fun and engaging way to test your knowledge and
                  improve your skills in a particular topic or subject
                </p>
              </div>
              {/* each question will have the logo of MERN type selected */}
              <div className="md:p-2 p-1 sm:w-1/2 flex flex-col justify-between">
                <img
                  alt="gallery"
                  className="w-full object-cover h-1.5/2 object-center block"
                  src={nodeimg}
                />
                <p className=" px-2  leading-relaxed text-base dark:text-snow  text-justify  text-git-nav">
                  Start taking quizzes today and start building your expertise
                  in this exciting and in-demand field of web development!
                </p>
              </div>
              <div className="md:p-2 p-1 w-full flex overflow-hidden rounded-lg  lg:opacity-100">
                <img
                  alt="gallery"
                  className="w-full h-fit object-cover object-center block"
                  src={reactimg}
                />
              </div>
            </div>
            <div className="sm:flex sm:flex-wrap sm:w-1/2">
              <div className="md:p-2 p-1 overflow-hidden rounded-lg ">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={Setup}
                />
              </div>
              <div className="md:p-2 p-1 sm:w-1/2">
                <img
                  alt="gallery"
                  className="sm:w-fit object-cover h-fit object-center block border-rounded"
                  src={expressimg}
                />
                <img
                  alt="gallery"
                  className="w-fit object-cover h-fit object-center block"
                  src={Box}
                />
              </div>
              <div className="md:p-2 p-1 sm:w-1/2">
                <img
                  alt="gallery"
                  className="w-full h-2/3 object-cover object-center block"
                  src={jsimg}
                />
                <img
                  alt="gallery"
                  class="w-full h-fit object-cover object-center block"
                  src={mongodbimg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateQuiz;
