//import Game component
import Game from './components/game';
import React, {useEffect, useState, ChangeEvent} from 'react';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';


import "./style/main.css";

const label = { inputProps: { 'label': 'Switch demo' } };

function App() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const gameView = document.getElementById("gameView");
    gameView.focus();
    console.log("test");
    console.log(checked)
  }, [checked])
  console.log("test switch");

  return (
    <div className="App">
      <div className="wrapper" style={{backgroundColor: backgroundColor}}>
        <div className="header">
          <h1 className="gameTitle" style={{color: textColor}}>Huedle</h1>
          <p className="gameSubTitle" style={{color: textColor}}>Wordle, but with hex colors</p>
        </div>
        <Game setBackgroundColor={(color) => setBackgroundColor(color)} checked={checked} setTextColor={(color) => setTextColor(color)}/>
      </div>
      <div class="switch">
        <Switch 
          {...label} 
          checked={checked} 
          onChange={handleChange}
        />
        <span className='switchText'> Hard mode </span>
      </div>
    </div>
  );
}


export default App;
