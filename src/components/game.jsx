// import react
import React, { useState, useEffect } from "react";
import {Modal, Button} from "@mantine/core";

let hardMode = true;

// create function component called Game
const Game = (props) => {
    hardMode = props.checked;
    const [color, setColor] = useState("");
    const [currentBox, setCurrentBox] = useState(1);
    const [currentCol, setCurrentCol] = useState(1);
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameLost, setGameLost] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    let localGuess = "abc";
    useEffect(() => {

        const hexToRgb = (hex) => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
              ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                }
              : null;
          };

        const isGoodContrast = (hex) => {
            const { r, g, b } = hexToRgb(hex);
            if (Math.max(r, g, b + 50) > 200) {
              return false;
            } else {
              return true;
            }
          };

        //generate random valid hex color with sum of 350
        const randomColor = () => {
            const letters = "0123456789ABCDEF";
            let sum = 350;
            let color = "#";

            let generatedColor = Math.random() * 255;
            color += letters[Math.floor(generatedColor / 16)];
            color += letters[Math.floor(generatedColor) % 16];
            sum -= generatedColor;

            generatedColor = Math.random() * 255;
            color += letters[Math.floor(generatedColor / 16)];
            color += letters[Math.floor(generatedColor) % 16];
            sum -= generatedColor;

            if (sum <= 255 && sum >= 0) {
                generatedColor = sum;
                color += letters[Math.floor(generatedColor / 16)];
                color += letters[Math.floor(generatedColor) % 16];
                sum -= generatedColor;
            } else {
                color = randomColor();
            }

            return color;
        };
        const newRandomColor = randomColor();
        setColor(newRandomColor);
        props.setBackgroundColor(newRandomColor);
        console.log(newRandomColor);

        const inputBoxes = document.getElementsByClassName("inputbox");
        const colorBoxes = document.getElementsByClassName("colorbox");

        if (isGoodContrast(newRandomColor)) {
            props.setTextColor("white");
            for (let i = 0; i < inputBoxes.length; i++) {
              inputBoxes[i].style.border = "5px solid #ffffff69";
            }
            for (let i = 0; i < colorBoxes.length; i++) {
              colorBoxes[i].style.border = "5px solid #ffffff69";
            }
          } else {
            props.setTextColor("black");
            for (let i = 0; i < inputBoxes.length; i++) {
              inputBoxes[i].style.border = "5px solid #00000069";
            }
            for (let i = 0; i < colorBoxes.length; i++) {
              colorBoxes[i].style.border = "5px solid #00000069";
            }
          }
    }, []);

    const gameLoop = (e) => {
        const allowedLetters = /[0-9a-fA-F]+/;
        const inputboxes = document.querySelectorAll(".inputbox");
        if (e.key !== "Backspace" && e.key !== "Enter" && e.key !== "Escape") {
            if (
                allowedLetters.test(e.key) &&
                e.key.length < 2 &&
                currentBox < 7
            ) {
                document.getElementById(
                    `col${currentCol}box${currentBox}`
                ).innerHTML = e.key;
                setCurrentBox(currentBox + 1);
                setCurrentGuess(currentGuess + e.key);
            }
        } else if (e.key === "Backspace") {
            if (currentBox > 1) {
                setCurrentBox(currentBox - 1);
                document.getElementById(
                    `col${currentCol}box${currentBox - 1}`
                ).innerHTML = "";
                setCurrentGuess(currentGuess.slice(0, -1));
                //localGuess = localGuess.slice(0, -1);
            }
        } else if (e.key === "Enter") {
            if (currentBox === 7 && currentCol === 6) {
              setGameLost(true);
            }
            if (currentBox === 7 && currentCol < 6) {
              setCurrentCol(currentCol + 1);
              setCurrentBox(1);
              setCurrentGuess("");
              for (let i = 1; i < color.length; i++) {
                let heat =
                  parseInt(currentGuess.toUpperCase().charAt(i - 1), 16) -
                  parseInt(color.charAt(i), 16);
                if (heat == 0) {
                  document.getElementById(
                    `col${currentCol}box${i}`
                  ).style.backgroundColor = "green";
                } else {
                  const letters = "0123456789ABCDEF";
                  let heatColor = 0;
                  if(!hardMode){
                    if (heat > 0) {
                        heat = Math.ceil(heat / 1.3) + 3;
                        heatColor = "#" + letters[heat] + "00000";
                    } else {
                        heat = Math.ceil(heat / 1.3) - 3;
                        heatColor = "#0000" + letters[-heat] + "0";
                    }
                } else {
                    if(heat > 0){
                        heatColor = "#B00000";
                    }else{
                        heatColor = "#0000B0";
                    }
                }
      
                  document.getElementById(
                    `col${currentCol}box${i}`
                  ).style.backgroundColor = heatColor;
                }
              }
              console.log(currentGuess);
              document.getElementById(
                `col${currentCol}color1`
              ).style.backgroundColor = "#" + currentGuess.toString();
              document.getElementById(
                `col${currentCol}color2`
              ).style.backgroundColor = "#" + currentGuess.toString();
              if (`#${currentGuess.toUpperCase()}` === color) {
                setGameWon(true);
              } else {
                console.log("Incorrect!");
              }
            } else if (currentBox === 7 && currentCol === 6) {
              setCurrentCol(1);
              setCurrentBox(1);
              setCurrentGuess("");
              for (let i = 1; i < color.length; i++) {
                let heat =
                  parseInt(currentGuess.toUpperCase().charAt(i - 1), 16) -
                  parseInt(color.charAt(i), 16);
                if (heat == 0) {
                  document.getElementById(
                    `col${currentCol}box${i}`
                  ).style.backgroundColor = "green";
                } else {
                  const letters = "0123456789ABCDEF";
                  let heatColor = 0;
                  if(!hardMode){
                    if (heat > 0) {
                        heat = Math.ceil(heat / 1.3) + 3;
                        heatColor = "#" + letters[heat] + "00000";
                    } else {
                        heat = Math.ceil(heat / 1.3) - 3;
                        heatColor = "#0000" + letters[-heat] + "0";
                    }
                } else {
                    if(heat > 0){
                        heatColor = "#B00000";
                    }else{
                        heatColor = "#0000B0";
                    }
                }
      
                  document.getElementById(
                    `col${currentCol}box${i}`
                  ).style.backgroundColor = heatColor;
                }
              }
              if (`#${currentGuess.toUpperCase()}` === color) {
                console.log("Correct!");
              } else {
                console.log("Incorrect!");
              }
            }
        } else if (e.key === "Escape") {
            document.location.reload();
        }

        //console.log(currentGuess);
        //console.log(localGuess);
    };
    return (
        <>
            
            <div
                className="gameView"
                onKeyUp={(event) => gameLoop(event)}
                tabIndex="1"
                id="gameView"
            >
                <Modal
          opened={gameLost}
          onClose={() => document.location.reload()}
          title="You Lost"
        >
          <p>You didn't guess the correct color.</p>
          <p>
            The color was <span style={{ color: color }}>{color}</span>
          </p>
          <Button
            style={{ marginTop: 20 }}
            sx={(theme) => ({
              backgroundColor: color,
              "&:hover": {
                backgroundColor: color,
                filter: "brightness(120%)",
              },
            })}
            onClick={() => document.location.reload()}
          >
            Try Again
          </Button>
        </Modal>
        <Modal
          opened={gameWon}
          onClose={() => document.location.reload()}
          title="You Won!"
        >
          <p>You guesed the correct color!</p>
          <p>
            The color was <span style={{ color: color }}>{color}</span>
          </p>
          <Button
            style={{ marginTop: 20 }}
            sx={(theme) => ({
              backgroundColor: color,
              "&:hover": {
                backgroundColor: color,
                filter: "brightness(120%)",
              },
            })}
            onClick={() => document.location.reload()}
          >
            Try Again
          </Button>
        </Modal>
                <div className="cols">
                    <div className="col" id="col1">
                        <div className="inputbox" id="col1box1"></div>
                        <div className="inputbox" id="col1box2"></div>
                        <div className="colorbox" id="col1color1"></div>
                        <div className="inputbox" id="col1box3"></div>
                        <div className="inputbox" id="col1box4"></div>
                        <div className="colorbox" id="col1color2"></div>
                        <div className="inputbox" id="col1box5"></div>
                        <div className="inputbox" id="col1box6"></div>
                    </div>
                    <div className="col" id="col2">
                        <div className="inputbox" id="col2box1"></div>
                        <div className="inputbox" id="col2box2"></div>
                        <div className="colorbox" id="col2color1"></div>
                        <div className="inputbox" id="col2box3"></div>
                        <div className="inputbox" id="col2box4"></div>
                        <div className="colorbox" id="col2color2"></div>
                        <div className="inputbox" id="col2box5"></div>
                        <div className="inputbox" id="col2box6"></div>
                    </div>
                    <div className="col" id="col3">
                        <div className="inputbox" id="col3box1"></div>
                        <div className="inputbox" id="col3box2"></div>
                        <div className="colorbox" id="col3color1"></div>
                        <div className="inputbox" id="col3box3"></div>
                        <div className="inputbox" id="col3box4"></div>
                        <div className="colorbox" id="col3color2"></div>
                        <div className="inputbox" id="col3box5"></div>
                        <div className="inputbox" id="col3box6"></div>
                    </div>
                    <div className="col" id="col4">
                        <div className="inputbox" id="col4box1"></div>
                        <div className="inputbox" id="col4box2"></div>
                        <div className="colorbox" id="col4color1"></div>
                        <div className="inputbox" id="col4box3"></div>
                        <div className="inputbox" id="col4box4"></div>
                        <div className="colorbox" id="col4color2"></div>
                        <div className="inputbox" id="col4box5"></div>
                        <div className="inputbox" id="col4box6"></div>
                    </div>
                    <div className="col" id="col5">
                        <div className="inputbox" id="col5box1"></div>
                        <div className="inputbox" id="col5box2"></div>
                        <div className="colorbox" id="col5color1"></div>
                        <div className="inputbox" id="col5box3"></div>
                        <div className="inputbox" id="col5box4"></div>
                        <div className="colorbox" id="col5color2"></div>
                        <div className="inputbox" id="col5box5"></div>
                        <div className="inputbox" id="col5box6"></div>
                    </div>
                    <div className="col" id="col6">
                        <div className="inputbox" id="col6box1"></div>
                        <div className="inputbox" id="col6box2"></div>
                        <div className="colorbox" id="col6color1"></div>
                        <div className="inputbox" id="col6box3"></div>
                        <div className="inputbox" id="col6box4"></div>
                        <div className="colorbox" id="col6color2"></div>
                        <div className="inputbox" id="col6box5"></div>
                        <div className="inputbox" id="col6box6"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
