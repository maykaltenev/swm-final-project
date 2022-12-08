import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./components/Context/UserContext";
import Home from "./components/Home/Home";
import SideBar from "./components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
//import GLogin from "./components/GLogin/GLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import Quiz from "./components/Quiz/Quiz";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import QuizHistory from "./components/QuizHistory/QuizHistory";
import Result from "./components/Result/Result";
import MyDocument from "./components/MyDocument/MyDocument";
import "./index.css";
import ViewCertificate from "./components/ViewCertificate/ViewCertificate";

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
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/mypage/:id" element={<Quiz />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/quizhistory" element={<QuizHistory />} />
           <Route path="/mycertificates" element={<ViewCertificate />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
