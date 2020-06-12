import React, { useState, useEffect } from 'react';
import { ScoresList, ScoreLI } from '../styled/HighScores';
import { StyledTitle } from '../styled/Random';

export default function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    console.log('getting high scores');

    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
        console.log(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <StyledTitle>High scores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
