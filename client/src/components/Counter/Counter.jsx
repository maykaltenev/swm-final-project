import { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState("");
  return (
    <>
      {" "}
      <div>{counter}</div>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
        data-testid="plusbutton"
      >
        +
      </button>
      <button
        onClick={() => {
          setCounter((prev) => prev - 1);
        }}
      >
        -
      </button>
    </>
  );
}

export default Counter;
