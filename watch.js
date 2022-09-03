
const puppeteer = require('puppeteer');
const music = require("./music");
const MyLights = require("./lights");

class MyWatch {

  myLights = new MyLights();
  
  startWatching() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.espn.com/college-football/game?gameId=401416590');

    const selectorValue = "#gamepackage-matchup-wrap > header > div > div.team.away > div > div.score-container > div";
    const selectorValue2 = "#gamepackage-matchup-wrap > header > div > div.team.away.possession > div > div.score-container > div";
    //const timeSelector = "#gamepackage-matchup-wrap > header > div > div.game-status > span.game-time > span";

    let f = await page.$(selectorValue);
    if (!f) {
      f = await page.$(selectorValue2);
    }

    let currentText = "";
    let keepReading = true;
    let count = 0;
    do {
      const text = await(await f.getProperty('textContent')).jsonValue();
      console.log("Score is: " + text);
      if (currentText != "" && currentText != text) {
        console.log("Score changed");
        music.startMusic();
        myLights.start();
      }
      currentText = text;

      console.log('waiting');
      await delay(5000);
      count++;
    } while (count < 600);

    await browser.close();
  };

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyWatch;