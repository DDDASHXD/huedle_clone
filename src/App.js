//import Game component
import Game from './components/game';
import React, {useEffect, useState} from 'react'

import "./style/main.css";


function App() {

  useEffect(() => {
    const gameView = document.getElementById("gameView");
    gameView.focus();
  }, [])

  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");

  return (
    <div className="App">
      <div className="wrapper" style={{backgroundColor: backgroundColor}}>
        <div className="header">
          <h1 className="gameTitle" style={{color: textColor}}>Huedle</h1>
          <p className="gameSubTitle" style={{color: textColor}}>Wordle, but with hex colors</p>
        </div>
        <Game setBackgroundColor={(color) => setBackgroundColor(color)} setTextColor={(color) => setTextColor(color)}/>
      </div>
      {/* toggle here */}
    </div>
  );
}

export default App;
