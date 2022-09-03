const config = require("./config.json");
const puppeteer = require('puppeteer');

module.exports.startMusic = async function() {
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

  await delay(config.musicLengthMs);
  await browser.close();
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}