import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
