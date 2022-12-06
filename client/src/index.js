import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./components/Context/UserContext";
import { QuestionContextProvider } from "./components/Context/QuestionContext";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <QuestionContextProvider>
        <App />
      </QuestionContextProvider>
    </UserContextProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
