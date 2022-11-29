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
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const { currentQuestion, setCurrentQuestion } = useContext(UserContext);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/mypage/:id" element={<Quiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/timer" element={<CountDownTimer />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
