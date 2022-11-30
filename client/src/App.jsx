/* import "./App.css"; */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
//import QuestionCard from "./components/QuestionCard/QuestionCard";
import Quiz from "./components/Quiz/Quiz";
import CountDownTimer from "./components/Timer/Timer";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import GLogin from "./components/GLogin/GLogin";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import { useContext } from "react";
import { UserContext } from "./components/Context/UserContext";


function App() {
  const { currentQuestion, setCurrentQuestion } = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/glogin/:id" element={<GLogin />} />
        <Route path="/mypage/:id" element={<Quiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/timer" element={<CountDownTimer />} />
     
      </Routes>
    </div>
  );
}

export default App;
