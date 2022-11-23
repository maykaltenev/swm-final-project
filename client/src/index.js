import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/Context/UserContext";
import { QuestionContextProvider } from "./components/Context/QuestionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <QuestionContextProvider>
        <App />
      </QuestionContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
