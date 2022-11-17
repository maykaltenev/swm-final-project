/* import "./App.css"; */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
//import QuestionCard from "./components/QuestionCard/QuestionCard";
import Quiz from "./components/Quiz/Quiz";
import CountDownTimer from "./components/Timer/Timer";
import Home from "./components/Home/Home";
//css
import "./App.css"
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Quiz />} />
        <Route path="timer" element={<CountDownTimer />} />
      </Routes>
    </div>
  );
}

export default App;
