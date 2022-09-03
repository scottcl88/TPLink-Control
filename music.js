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
  await page.goto('https://youtube.com/clip/UgkxE02q5HgXWosHjn5KwDH1OqnuaDApqNFK');

  await delay(40000);
  await browser.close();
};

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}