/*
Links:
https://github.com/konsumer/tplink-lightbulb
https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Windows-10
https://www.briandorey.com/post/tp-link-lb130-smart-wi-fi-led-bulb-python-control
https://github.com/python-kasa/python-kasa
https://www.w3docs.com/tools/color-hsl
/*
192.168.1.42 - Desk - KL430(US)
192.168.1.63 - TV - KL430(US)
192.168.1.198 - Kitchen Light - KL130(US)
*/
const TPLSmartDevice = require("tplink-lightbulb")
const MyBulb = require("./bulb")
const MyStrip = require("./strip")
const config = require("./config.json")

class MyLights {

  kitchenLight = new TPLSmartDevice('192.168.1.198');
  deskStrip = new TPLSmartDevice('192.168.1.42');
  tvStrip = new TPLSmartDevice('192.168.1.63');

  bulb = new MyBulb();
  strip = new MyStrip();

  doRed = true;
  count = 0;

  isPlaying = false;

  async start() {
    console.log("Starting lights loop");
    this.isPlaying = true;
    while (this.count < config.lightsCount) {
      if (this.doRed) {     
        this.bulb.setColor(this.kitchenLight, config.primaryColorHue, config.primaryColorSaturation);
        this.strip.setColor(this.deskStrip, config.secondaryColorHue, config.secondaryColorSaturation);
        this.strip.setColor(this.tvStrip, config.secondaryColorHue, config.secondaryColorSaturation);
      } else {
        this.bulb.setColor(this.kitchenLight, config.secondaryColorHue, config.secondaryColorSaturation);
        this.strip.setColor(this.deskStrip, config.primaryColorHue, config.primaryColorSaturation);
        this.strip.setColor(this.tvStrip, config.primaryColorHue, config.primaryColorSaturation);
      }
      this.doRed = !this.doRed;
      this.count++;
      await this.delay(config.lightsDelayMs);
    }
    await this.delay(config.lightsDelayMs);
    this.bulb.setWhiteColor(this.kitchenLight);
    this.strip.setAuroraColor(this.deskStrip);
    this.strip.setAuroraColor(this.tvStrip);
    this.isPlaying = false;
    this.count = 0;
    console.log("Stopping lights");
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyLights;