class MyBulb {

  setColor(light, hue, saturation) {
    // console.log("Setting red color");
    light.send({
      "smartlife.iot.smartbulb.lightingservice":
      {
        "transition_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": hue, "on_off": 1, "saturation": saturation, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        //  console.log("Red color set");
      })
      .catch((e) => console.error(e))
  }

  setRedColor(light) {
    // console.log("Setting red color");
    light.send({
      "smartlife.iot.smartbulb.lightingservice":
      {
        "transition_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": 357, "on_off": 1, "saturation": 100, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        //  console.log("Red color set");
      })
      .catch((e) => console.error(e))
  }

  setWhiteColor(light) {
    // console.log("Setting white color");
    light.send({
      "smartlife.iot.smartbulb.lightingservice":
      {
        "transition_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": 177, "on_off": 1, "saturation": 0, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        //  console.log("White color set");
      })
      .catch((e) => console.error(e))

  }

}
module.exports = MyBulb;