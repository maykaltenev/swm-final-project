/* import "./App.css"; */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
//import QuestionCard from "./components/QuestionCard/QuestionCard";
import Quiz from "./components/Quiz/Quiz";
import CountDownTimer from "./components/Timer/Timer";
import QuestionCard from "./components/QuestionCard/QuestionCard";

import CreateQuiz from "./components/CreateQuiz/CreateQuiz";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Quiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/timer" element={<CountDownTimer />} />
      </Routes>
    </div>
  );
}

export default App;
