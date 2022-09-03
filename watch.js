
const puppeteer = require('puppeteer');
const music = require("./music");
const MyLights = require("./lights");

class MyWatch {

  myLights = new MyLights();

  async startWatching(gameId, isHome) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.espn.com/college-football/game?gameId=' + gameId);

    const homeSelectorValue = "#gamepackage-matchup-wrap > header > div > div.team.home > div > div.score-container > div";
    const homeSelectorValuePoss = "#gamepackage-matchup-wrap > header > div > div.team.home.possession > div > div.score-container > div";

    const awaySelectorValue = "#gamepackage-matchup-wrap > header > div > div.team.away > div > div.score-container > div";
    const awaySelectorValuePoss = "#gamepackage-matchup-wrap > header > div > div.team.away.possession > div > div.score-container > div";

    const timeSelector = "#gamepackage-matchup-wrap > header > div > div.game-status > span.game-time > span";
    const timeDetailSelector = "#gamepackage-matchup-wrap > header > div > div.game-status > span";

    let currentText = "";
    let keepReading = true;
    let count = 0;
    //music.startMusic();
    //this.myLights.start();
    do {
      let element = null;
      if (isHome) {
        element = await page.$(homeSelectorValue);
        if (!element) {
          element = await page.$(homeSelectorValuePoss);
        }
      } else {
        element = await page.$(awaySelectorValue);
        if (!element) {
          element = await page.$(awaySelectorValuePoss);
        }
      }
      let text = await (await element.getProperty('textContent')).jsonValue();
      console.log("Score is: " + text);
      if (currentText != "" && currentText != text) {
        console.log("Score changed");
        music.startMusic();
        this.myLights.start();
      }
      currentText = text;

      element = await page.$(timeSelector);
      if (element) {
        text = await (await element.getProperty('textContent')).jsonValue();
        if (text == "Final") {
          console.log("Game finished");
          break;
        }
      } else {
        element = await page.$(timeDetailSelector);
        if (element) {
          text = await (await element.getProperty('textContent')).jsonValue();
          if (text == "Final") {
            console.log("Game finished");
            break;
          }
        }
      }

      console.log('waiting');
      await this.delay(5000);
      count++;
    } while (count < 3600);//18000 seconds in 5 hours, 5 seconds each loop means 3600

    console.log("Closing watch browser. Count: ", count);
    await browser.close();
  };

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyWatch;