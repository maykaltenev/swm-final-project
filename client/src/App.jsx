/* import "./App.css"; */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
//import QuestionCard from "./components/QuestionCard/QuestionCard";
import Quiz from "./components/Quiz/Quiz";
import CountDownTimer from "./components/Timer/Timer";
import QuestionCard from "./components/QuestionCard/QuestionCard";

import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import { useContext } from "react";
import { UserContext } from "./components/Context/UserContext";
import Result from "./components/Result/Result";

import "./index.css";
import Home from "./components/Home/Home";
import QuizHistory from "./components/QuizHistory/QuizHistory";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import GLogin from "./components/GLogin/GLogin";
import SideBar from "./components/SideBar/SideBar";
import QuizCard from "./components/QuizCard/QuizCard";
function App() {
  const { currentQuestion, setCurrentQuestion } = useContext(UserContext);
  const { user } = useContext(UserContext);

  return (
    <div className="w-full flex justify-center dark:bg-bg-xiketic">
      <div className="relative sm:w-3/4">
        <Header />
        {user && <SideBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/mypage/:id" element={<Quiz />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/quizhistory" element={<QuizHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
