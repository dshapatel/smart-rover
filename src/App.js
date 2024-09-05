import React, { useState } from "react";
import "./App.css";

//set the grid size
const GRID_SIZE = 5;
//to change the emojis when direction is changed
const directionEmojis = {
  UP: "🦖⬆️",
  RIGHT: "🦖➡️",
  DOWN: "🦖⬇️",
  LEFT: "🦖⬅️",
};

function App() {
  // set the position in x,y co-ordinates
  const [position, setPosition] = useState({ x: 2, y: 2 });
  //set the direction
  const [direction, setDirection] = useState("RIGHT");
  //for tracking the rover path
  const [path, setPath] = useState([{ x: 2, y: 2 }]); // To track the Rover's path

  // function will update the rover position according to it's direction
  const moveForward = () => {
    let newPosition = { ...position };
    switch (direction) {
      case "UP":
        if (newPosition.y > 0) newPosition.y--;
        break;
      case "RIGHT":
        if (newPosition.x < GRID_SIZE - 1) newPosition.x++;
        break;
      case "DOWN":
        if (newPosition.y < GRID_SIZE - 1) newPosition.y++;
        break;
      case "LEFT":
        if (newPosition.x > 0) newPosition.x--;
        break;
      default:
        break;
    }
    setPosition(newPosition);
    setPath([...path, newPosition]); // Track the new position in the path
  };

  return (
    <div className="App">
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/dsha/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <h1>Smart Rover</h1>

      <div className="grid">
        {/* Using map to loop through 5x5 grid */}
        {[...Array(GRID_SIZE)].map((_, row) => (
          <div key={row} className="row">
            {[...Array(GRID_SIZE)].map((_, col) => {
              const isRover = position.x === col && position.y === row;
              const hasVisited = path.some((p) => p.x === col && p.y === row);

              return (
                <div
                  key={col}
                  className={`cell ${
                    isRover ? "rover" : hasVisited ? "visited" : ""
                  }`}
                >
                  {isRover ? directionEmojis[direction] : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="direction-controls">
          <div className="arrow up" onClick={() => setDirection("UP")}></div>

          <div style={{ display: "flex", margin: "20px" }}>
            <div
              className="arrow left"
              onClick={() => setDirection("LEFT")}
            ></div>
            <button onClick={moveForward}>Move</button>
            <div
              className="arrow right"
              onClick={() => setDirection("RIGHT")}
            ></div>
          </div>
          <div
            className="arrow down"
            onClick={() => setDirection("DOWN")}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
