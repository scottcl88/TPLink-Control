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


  start() {
    interval = setInterval(() => {
      console.log("In interval: ", doRed);
      if (doRed) {
        bulb.setRedColor(kitchenLight);
        strip.setRedColor(deskStrip);
      } else {
        bulb.setWhiteColor(kitchenLight);
        strip.setWhiteColor(deskStrip);
      }
      doRed = !doRed;
      count++;
      if (count >= 5) {
        console.log("Stopping interval");
        clearInterval(interval);
      }
    }, 3000);
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time)
    });
  }

}
module.exports = MyLights;