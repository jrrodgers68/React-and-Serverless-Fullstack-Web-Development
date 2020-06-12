import React, { useState, useEffect } from 'react';
import { ScoresList, ScoreLI } from '../styled/HighScores';

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
      <h1>High scores</h1>
      <ScoresList>
        {highScores.map((score) => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}
