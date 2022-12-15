import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useContext } from "react";

import { QuestionContext } from "../Context/QuestionContext";

function CountDownTimer() {
  const { timeDifference, duration, handleTimeOver } =
    useContext(QuestionContext);
/* formatting the remaining time */
  const formatRemainingTime = (time) => {
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${minutes}:${seconds}`;
  };
/* if remaining time is <=0 call the timeover function */
  const renderTime = ({ remainingTime }) => {
    if (remainingTime <= 0) {
      return handleTimeOver();    
    }
/* else return the formatted time */
    return (
      <div className="timer sm:text-2xl  ">
        <div className="text"></div>
        <div className=" ">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };
/* displaying the timer function on the quiz card */
  return (
    <div className=" flex my-2 w-1/2 justify-center dark:text-text-ghost-white">
      <div className=" rounded-full timer-wrapper text-xl sm:text-sm ">
        <CountdownCircleTimer
          isPlaying
          size={110}
          colors={["#5855D8", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          duration={duration}
          initialRemainingTime={timeDifference}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default CountDownTimer;
