const config = require("./config.json");
const puppeteer = require('puppeteer');

class MyMusic {
  
  isPlaying = false;

  async startMusic() {
    this.isPlaying = true;
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: [
        "--mute-audio",
      ],
      args: [
        "--autoplay-policy=no-user-gesture-required",
      ],
    });
    const page = await browser.newPage();
    await page.goto(config.musicUrl);

    await this.delay(config.musicLengthMs);
    await browser.close();
    this.isPlaying = false;
  };

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyMusic;