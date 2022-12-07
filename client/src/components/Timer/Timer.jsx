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
  const timeDifference = differenceInSeconds(new Date(quizTime?.end), date);

  useEffect(() => {
    getQuizTimeFromLocalStorage();
  }, []);
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
    <div className=" flex my-6 w-1/2 mx-2">
      <div className="timer-wrapper text-sm  rounded-full  border-2 border-cyber-yellow">
        <CountdownCircleTimer
          isPlaying
          size={130}
          colors={["#5068F2", "#5855D8", "#FFD51C", "#A30000"]}
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
