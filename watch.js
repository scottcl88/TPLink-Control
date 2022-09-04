const puppeteer = require('puppeteer');
const MyLights = require("./lights");
const MyMusic = require('./music');

class MyWatch {

  myLights = new MyLights();
  myMusic = new MyMusic();

  page;
  currentText = "";

  async startWatching(gameId, isHome) {
    const browser = await puppeteer.launch();
    this.page = await (await browser.newPage());
    await this.page.goto('https://www.espn.com/college-football/game?gameId=' + gameId);

    let count = 0;
    do {
      if (await this.didScoreChange(isHome)) {
        console.log("Score changed");
        if (!this.myMusic.isPlaying) {
          this.myMusic.startMusic();
        } else {
          console.log("music is already playing")
        }
        if (!this.myLights.isPlaying) {
          this.myLights.start();
        } else {
          console.log("lights are already playing")
        }
      }

      if (await this.isGameFinished()) {
        console.log("Game finished");
        break;
      }

      console.log('waiting #', count);
      await this.delay(5000);

      if (count > 0 && count % 100 == 0) {
        //reload every 100 counts to try to reduce memory/cpu
        console.log("Reloading watch page");
        await this.page.close();
        this.page = await (await browser.newPage());
        await this.page.goto('https://www.espn.com/college-football/game?gameId=' + gameId);
      }

      count++;

    } while (count < 3600);//18000 seconds in 5 hours, 5 seconds each loop means 3600

    console.log("Closing watch browser. Count: ", count);
    this.count = 0;
    await browser.close();
  }

  async didScoreChange(isHome) {
    const homeSelectorValue = "#gamepackage-matchup-wrap > header > div > div.team.home > div > div.score-container > div";
    const homeSelectorValuePoss = "#gamepackage-matchup-wrap > header > div > div.team.home.possession > div > div.score-container > div";

    const awaySelectorValue = "#gamepackage-matchup-wrap > header > div > div.team.away > div > div.score-container > div";
    const awaySelectorValuePoss = "#gamepackage-matchup-wrap > header > div > div.team.away.possession > div > div.score-container > div";
    let element = null;
    if (isHome) {
      element = await this.page.$(homeSelectorValue);
      if (!element) {
        element = await this.page.$(homeSelectorValuePoss);
      }
    } else {
      element = await this.page.$(awaySelectorValue);
      if (!element) {
        element = await this.page.$(awaySelectorValuePoss);
      }
    }
    let text = await (await element.getProperty('textContent')).jsonValue();
    console.log("Score is: " + text);
    if (this.currentText != "" && this.currentText != text) {
      this.currentText = text;
      return true;
    }
    this.currentText = text;
    return false;
  }

  async isGameFinished() {
    const timeSelector = "#gamepackage-matchup-wrap > header > div > div.game-status > span.game-time > span";
    const timeDetailSelector = "#gamepackage-matchup-wrap > header > div > div.game-status > span";
    let text = "";
    let element = await this.page.$(timeSelector);
    if (element) {
      text = await (await element.getProperty('textContent')).jsonValue();
      if (text == "Final") {
        return true;
      }
    } else {
      element = await this.page.$(timeDetailSelector);
      if (element) {
        text = await (await element.getProperty('textContent')).jsonValue();
        if (text == "Final") {
          return true;
        }
      }
    }
    return false;
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyWatch;