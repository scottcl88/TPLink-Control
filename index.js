/*
Links:
https://github.com/konsumer/tplink-lightbulb
https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Windows-10
https://github.com/steveredden/homebridge-kasa-lightstrip
https://www.briandorey.com/post/tp-link-lb130-smart-wi-fi-led-bulb-python-control
https://github.com/python-kasa/python-kasa
https://www.w3docs.com/tools/color-hsl
https://github.com/python-kasa/python-kasa/issues/191
/*
192.168.1.42 - Desk - KL430(US)
192.168.1.198 - Kitchen Light - KL130(US)
*/

const MyWatch = require("./watch")
const config = require("./config.json")

let myWatch = new MyWatch();
myWatch.startWatching(config.gameId, config.isHome);


// const TPLSmartDevice = require("tplink-lightbulb")
// const MyStrip = require("./strip")

// strip = new MyStrip();
// deskStrip = new TPLSmartDevice('192.168.1.42');

// strip.setCustomColor(deskStrip);