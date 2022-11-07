/* import "./App.css"; */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import QuestionCard from "./components/QuestionCard/QuestionCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<QuestionCard />} />
      </Routes>
    </div>
  );
}

export default App;
