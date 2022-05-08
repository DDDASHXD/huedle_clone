const puppeteer = require('puppeteer');

const allowedLetters = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const pressRandomKey = () => {
    const randomIndex = Math.floor(Math.random() * allowedLetters.length);
    const randomLetter = allowedLetters[randomIndex];
    return randomLetter;
}

const sleep = ((ms) => new Promise(resolve => setTimeout(resolve, ms)));

const test = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    for (let i = 0; i < 5; i++) {
        for (let i = 0; i < 5; i++) {
            const key = pressRandomKey();
            await page.keyboard.press(key);
            await sleep(200);
            console.log(key)
        }
        await page.keyboard.press('Enter');
        await sleep(200);
    }
}

test();