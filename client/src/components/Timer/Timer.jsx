import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { differenceInSeconds } from "date-fns";
import { QuestionContext } from "../Context/QuestionContext";

function CountDownTimer() {
  const { timer } = useContext(UserContext);
  const { timeDifference } = useContext(QuestionContext);

  const duration = 600;

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

  const renderTime = ({ remainingTime }) => {
    if (remainingTime && timeDifference <= 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer sm:text-2xl ">
        <div className="text"></div>
        <div className="value">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };

  return (
    <div className="flex my-2 w-1/2 justify-center dark:text-text-ghost-white">
      <div className="timer-wrapper sm:text-sm">
        <CountdownCircleTimer
          isPlaying
          size={110}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
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
