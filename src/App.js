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
  return (
    <div className="App">
      <div className="header">
        <h1 className="gameTitle">Huedle</h1>
        <p className="gameSubTitle">Wordle, but with hex colors</p>
      </div>
      <Game setBackgroundColor={(color) => setBackgroundColor(color)}/>
    </div>
  );
}

export default App;
