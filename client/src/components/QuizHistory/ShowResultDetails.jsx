import React from "react";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";

function ShowResultDetails({ result }) {
  console.log(result);
  return (
    <div>
      hello
      <CheckAllAnswersResult allQues={result} />{" "}
    </div>
  );
}

export default ShowResultDetails;
