import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

type TPoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  const handlePlaceCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  };

  const handleRedo = () => {
    // TODO
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPopped(newPopped);
  };

  return (
    <>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo} disabled={popped.length === 0}>
        Redo
      </button>

      <div className='App' onClick={handlePlaceCircle}>
        {points?.map((point, index) => (
          <div
            style={{
              top: point.y + 'px',
              left: point.x + 'px',
            }}
            className='point'
            key={index}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
