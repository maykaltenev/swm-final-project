import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { differenceInSeconds } from "date-fns";

function CountDownTimer() {
  const { timer } = useContext(UserContext);

  const getQuizTimeFromLocalStorage = () => {
    const quizTime = localStorage.getItem("quizTime");
    if (quizTime) {
      return JSON.parse(localStorage.getItem("quizTime"));
    } else {
      return "";
    }
  };
  const [quizTime, setQuizTime] = useState(getQuizTimeFromLocalStorage());
  const date = new Date();
  const duration = 600;

  useEffect(() => {
    getQuizTimeFromLocalStorage();
  }, []);
  const timeDifference = differenceInSeconds(new Date(quizTime?.end), date);
  console.log(timeDifference);

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
      <div className="timer">
        <div className="text">Remaining time</div>
        <div className="value">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };

  return (
    <div>
      <h1>Remaining Time</h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
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
