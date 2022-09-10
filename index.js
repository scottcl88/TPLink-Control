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
192.168.1.63 - TV - KL430(US)
192.168.1.198 - Kitchen Light - KL130(US)
*/

//green: 100,100
//red: 0, 100
//white: 0,0

//marshall song: https://www.youtube.com/watch?v=AgE7EyPxcsI
//osu song: https://www.youtube.com/watch?v=5Tq4Wk0100w

const MyWatch = require("./watch")
const config = require("./config.json")
const fs = require('fs')

let exLog = console.log;
console.log = function (msg, ...optionalParams) {
    if (config.debugToFile) {
        try {
            let jsonString = JSON.stringify(...optionalParams);
            if(jsonString === null || jsonString === undefined){{
                jsonString = "";
            }}
            fs.appendFileSync('./log-file.txt', new Date().toLocaleTimeString() + " : " + msg + " " + jsonString + "\n");
        } catch (ex) {
            console.error("Error writing to file: ", ex);
        }
    }
    if (config.debugToConsole) {
        exLog(new Date().toLocaleTimeString() + " : " + msg, ...optionalParams);
    }
}


let myWatch = new MyWatch();
myWatch.startWatching(config.gameId, config.isHome);