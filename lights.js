/*
Links:
https://github.com/konsumer/tplink-lightbulb
https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Windows-10
https://www.briandorey.com/post/tp-link-lb130-smart-wi-fi-led-bulb-python-control
https://github.com/python-kasa/python-kasa
https://www.w3docs.com/tools/color-hsl
/*
192.168.1.42 - Desk - KL430(US)
192.168.1.198 - Kitchen Light - KL130(US)
*/
const TPLSmartDevice = require("tplink-lightbulb")
const MyBulb = require("./bulb")
const MyStrip = require("./strip")

class MyLights {

  kitchenLight = new TPLSmartDevice('192.168.1.198');
  deskStrip = new TPLSmartDevice('192.168.1.42');

  bulb = new MyBulb();
  strip = new MyStrip();

  doRed = true;
  count = 0;


  async start() {
    console.log("Starting lights loop");
    while (this.count < 30) {
      if (this.doRed) {
        this.bulb.setRedColor(this.kitchenLight);
        this.strip.setWhiteColor(this.deskStrip);
      } else {
        this.bulb.setWhiteColor(this.kitchenLight);
        this.strip.setRedColor(this.deskStrip);
      }
      this.doRed = !this.doRed;
      this.count++;
      await this.delay(1500);
    }
    console.log("Stopping lights");
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyLights;