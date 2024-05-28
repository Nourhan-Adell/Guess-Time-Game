import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStartTimer(){
        timer.current = setInterval(()=>{
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        },10);  // The target time is in seconds so we need to convert it into miliseconds.
    }

    function handleStopTimer(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    return(
        <>
            <ResultModal targetTime={targetTime}  ref={dialog} remainingTime={timeRemaining} onReset={handleReset}/> 
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-timer">
                {targetTime} second{targetTime > 1 ? 's':''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStopTimer : handleStartTimer}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge.
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Timer is running...' : 'Timer inactive'}.
                </p>
            </section>
        </>
    )
}