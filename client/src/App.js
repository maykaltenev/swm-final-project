<<<<<<< HEAD
=======
/* import "./App.css"; */
>>>>>>> f0720a400aa31ae51eba05d77ab024e05e680be4
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Counter from "./components/Counter/Counter";

function App() {
  return (
    <div className="App">
      <header></header>
      <Counter />
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
