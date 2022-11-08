import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";

function CountDownTimer() {
  const { timer, time } = useContext(UserContext);

  const [tm, setTm] = useState(time);

  console.log("time", time);

  useEffect(() => {
    timer();
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
    if (remainingTime && time <= 0) {
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
      <button onClick={timer}>set timer</button>
      <h1>Remaining Time</h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          initialRemainingTime={time}
          duration={600}
          isPlaying
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default CountDownTimer;
