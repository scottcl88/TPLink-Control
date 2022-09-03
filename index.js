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
// const MyWatch = require("./watch")

// let myWatch = new MyWatch();
// myWatch.startWatching();


const { Client } = require('tplink-smarthome-api');

const client = new Client();

// const plug = client.getDevice({ host: '10.0.1.2' }).then((device) => {
//   device.getSysInfo().then(console.log);
//   device.setPowerState(false);
// });

// Look for devices, log to console, and turn them on
client.startDiscovery().on('device-new', (device) => {
  device.getSysInfo().then(res => console.log(res.alias));
  // device.setPowerState(false);
});