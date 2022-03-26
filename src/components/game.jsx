// import react
import React, { useState, useEffect } from "react";

// create function component called Game
const Game = ({ setBackgroundColor }) => {
    const [color, setColor] = useState("");
    const [currentBox, setCurrentBox] = useState(1);
    const [currentCol, setCurrentCol] = useState(1);
    const [currentGuess, setCurrentGuess] = useState("");
    let localGuess = "abc";
    useEffect(() => {
        //generate random hex color
        const randomColor = () => {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        const newRandomColor = randomColor();
        setColor(newRandomColor);
        setBackgroundColor(newRandomColor);
        console.log(newRandomColor);
    }, []);

    const test = (e) => {
        //console.log(e.key);
        const allowedLetters = /[0-9a-fA-F]+/;
        //console.log(allowedLetters.test(e.key));
        const inputboxes = document.querySelectorAll(".inputbox");

        /*if (e.key !== "Backspace") {
            if (allowedLetters.test(e.key) && e.key.length < 2) {
                inputboxes[currentBox].innerHTML = e.key;
                setCurrentBox(currentBox + 1);
            }
        } else if (e.key === "Backspace") {
            if (currentBox > 0) {
                setCurrentBox(currentBox - 1);
                inputboxes[currentBox - 1].innerHTML = "";
            }
        } else if (e.key === "Enter") {
            if (currentBox === 6) {
                setCurrentCol(currentCol + 1);
                setCurrentBox(0);
            }
        }*/

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
            if (currentBox === 7 && currentCol < 8) {
                setCurrentCol(currentCol + 1);
                setCurrentBox(1);
                setCurrentGuess("");
                for (let i = 1; i < color.length; i++) {
                    if (
                        color.charAt(i) ===
                        currentGuess.toUpperCase().charAt(i - 1)
                    ) {
                        document.getElementById(
                            `col${currentCol}box${i}`
                        ).style.backgroundColor = "green";
                    } else if (
                        color.includes(currentGuess.toUpperCase().charAt(i - 1))
                    ) {
                        document.getElementById(
                            `col${currentCol}box${i}`
                        ).style.backgroundColor = "gray";
                    }
                }
                if (`#${currentGuess.toUpperCase()}` === color) {
                    console.log("Correct!");
                } else {
                    console.log("Incorrect!");
                }
            } else if (currentBox === 7 && currentCol === 8) {
                setCurrentCol(1);
                setCurrentBox(1);
                setCurrentGuess("");
                for (let i = 1; i < color.length; i++) {
                    if (
                        color.charAt(i) ===
                        currentGuess.toUpperCase().charAt(i - 1)
                    ) {
                        document.getElementById(
                            `col${currentCol}box${i}`
                        ).style.backgroundColor = "green";
                    } else if (
                        color.includes(currentGuess.toUpperCase().charAt(i - 1))
                    ) {
                        document.getElementById(
                            `col${currentCol}box${i}`
                        ).style.backgroundColor = "gray";
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
                style={{ background: color }}
                onKeyUp={(event) => test(event)}
                tabindex="1"
            >
                <div className="cols">
                    <div className="col" id="col1">
                        <div className="inputbox" id="col1box1"></div>
                        <div className="inputbox" id="col1box2"></div>
                        <div className="inputbox" id="col1box3"></div>
                        <div className="inputbox" id="col1box4"></div>
                        <div className="inputbox" id="col1box5"></div>
                        <div className="inputbox" id="col1box6"></div>
                    </div>
                    <div className="col" id="col2">
                        <div className="inputbox" id="col2box1"></div>
                        <div className="inputbox" id="col2box2"></div>
                        <div className="inputbox" id="col2box3"></div>
                        <div className="inputbox" id="col2box4"></div>
                        <div className="inputbox" id="col2box5"></div>
                        <div className="inputbox" id="col2box6"></div>
                    </div>
                    <div className="col" id="col3">
                        <div className="inputbox" id="col3box1"></div>
                        <div className="inputbox" id="col3box2"></div>
                        <div className="inputbox" id="col3box3"></div>
                        <div className="inputbox" id="col3box4"></div>
                        <div className="inputbox" id="col3box5"></div>
                        <div className="inputbox" id="col3box6"></div>
                    </div>
                    <div className="col" id="col4">
                        <div className="inputbox" id="col4box1"></div>
                        <div className="inputbox" id="col4box2"></div>
                        <div className="inputbox" id="col4box3"></div>
                        <div className="inputbox" id="col4box4"></div>
                        <div className="inputbox" id="col4box5"></div>
                        <div className="inputbox" id="col4box6"></div>
                    </div>
                    <div className="col" id="col5">
                        <div className="inputbox" id="col5box1"></div>
                        <div className="inputbox" id="col5box2"></div>
                        <div className="inputbox" id="col5box3"></div>
                        <div className="inputbox" id="col5box4"></div>
                        <div className="inputbox" id="col5box5"></div>
                        <div className="inputbox" id="col5box6"></div>
                    </div>
                    <div className="col" id="col6">
                        <div className="inputbox" id="col6box1"></div>
                        <div className="inputbox" id="col6box2"></div>
                        <div className="inputbox" id="col6box3"></div>
                        <div className="inputbox" id="col6box4"></div>
                        <div className="inputbox" id="col6box5"></div>
                        <div className="inputbox" id="col6box6"></div>
                    </div>
                    <div className="col" id="col7">
                        <div className="inputbox" id="col7box1"></div>
                        <div className="inputbox" id="col7box2"></div>
                        <div className="inputbox" id="col7box3"></div>
                        <div className="inputbox" id="col7box4"></div>
                        <div className="inputbox" id="col7box5"></div>
                        <div className="inputbox" id="col7box6"></div>
                    </div>
                    <div className="col" id="col8">
                        <div className="inputbox" id="col8box1"></div>
                        <div className="inputbox" id="col8box2"></div>
                        <div className="inputbox" id="col8box3"></div>
                        <div className="inputbox" id="col8box4"></div>
                        <div className="inputbox" id="col8box5"></div>
                        <div className="inputbox" id="col8box6"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
