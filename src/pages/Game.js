import React, { useState, useEffect, useCallback } from 'react';
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Random';
import { useScore } from '../contexts/ScoreContext';

export default function Game({ history }) {
  const [score, setScore] = useScore(0);
  const MAX_SECONDS = 5;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [ms, setMs] = useState(999);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  const updateTime = (startTime) => {
    const endTime = new Date();
    const msPassedStr = endTime.getTime() - startTime.getTime().toString();
    const formattedMSString = ('0000' + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    console.log(addLeadingZeros(updatedSeconds, 2));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  };

  const addLeadingZeros = (str, length) => {
    let zeros = '';
    for (let i = 0; i < length; i++) {
      zeros += '0';
    }
    return (zeros + str).slice(-length);
  };

  useEffect(() => {
    setScore(0);
    const currentTime = new Date();
    setRandomCharacter();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/gameOver');
    }
  }, [seconds, ms, history]);

  const keyUpHandler = useCallback(
    (e) => {
      console.log(e.key);
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1);
      } else {
        if (score > 0) {
          setScore((prevScore) => prevScore - 1);
        }
      }
      setRandomCharacter();
    },
    [currentCharacter]
  );

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyUpHandler]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(characters[randomInt]);
  };

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}
