class MyStrip {

  listEffects(light) {
    console.log("Listing effects");
    light.send({
      "smartlife.iot.lighting_effect":
      {
        "lighting_effect_state":

          { "custom": 1, "brightness": 100, "name": "OSU", "enable": 1, }

      }
    })
      .then((response) => {
        console.log("effects returned");
        console.log(response)
      })
      .catch((e) => console.error(e));
  }

  // { "custom": 0, "id": "tIwTRQBqJpeNKbrtBMFCgkdPTbAQGfRP", "brightness": 100, "name": "Bubbling Cauldron", "segments": [0], "expansion_strategy": 1, "enable": 1, "type": "random", "hue_range": [100, 270], "saturation_range": [80, 100], "brightness_range": [50, 100], "duration": 0, "transition": 200, "init_states": [[270, 100, 100]], "fadeoff": 1000, "random_seed": 24, "backgrounds": [[270, 40, 50]] }
  setAuroraColor(light) {
    console.log("Setting custom color");
    light.send({
      "smartlife.iot.lighting_effect":
      {
        "set_lighting_effect":
          { 'custom': 1, 'id': 'xqUxDhbAhNLqulcuRMyPBmVGyTOyEMEu', 'brightness': 100, 'name': 'MyCustomEffect1', 'segments': [0], 'expansion_strategy': 1, 'enable': 1, 'type': 'sequence', 'duration': 0, 'transition': 1500, 'direction': 4, 'spread': 7, 'repeat_times': 0, 'sequence': [[120, 100, 100], [240, 100, 100], [260, 100, 100], [280, 100, 100]] }
      }
    })
      .then((response) => {
        console.log(response)
        console.log("Custom color set");
      })
      .catch((e) => console.error(e));
  }

  setCustomColor(light) {
    console.log("Setting custom color");
    light.send({
      "smartlife.iot.lighting_effect":
      {
        "set_lighting_effect":
        {"custom": 0, "id": "xqUxDhbAhNLqulcuRMyPBmVGyTOyEMEu", "brightness": 100, "name": "Aurora", "segments": [0], "expansion_strategy": 1, "enable": 1, "type": "sequence", "duration": 0, "transition": 1500, "direction": 4, "spread": 7, "repeat_times": 0, "sequence": [[0, 100, 100], [0, 0, 100], [0, 100, 100], [0, 0, 100]]}
      }
    })
      .then((response) => {
        console.log(response)
        console.log("Custom color set");
      })
      .catch((e) => console.error(e));
  }

  setColor(light, hue, saturation) {
    //console.log("Setting red color");
    light.send({
      "smartlife.iot.lightStrip":
      {
        "set_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": hue, "on_off": 1, "saturation": saturation, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        // console.log("Red color set");
      })
      .catch((e) => console.error(e))
  }

  setRedColor(light) {
    //console.log("Setting red color");
    light.send({
      "smartlife.iot.lightStrip":
      {
        "set_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": 357, "on_off": 1, "saturation": 100, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        // console.log("Red color set");
      })
      .catch((e) => console.error(e))
  }

  setWhiteColor(light) {
    //console.log("Setting white color");
    light.send({
      "smartlife.iot.lightStrip":
      {
        "set_light_state":
        {
          "ignore_default": 1, "transition_period": 0, "mode": "normal", "hue": 177, "on_off": 1, "saturation": 0, "color_temp": 0, "brightness": 100
        }
      }
    })
      .then((response) => {
        //console.log(response)
        // console.log("White color set");
      })
      .catch((e) => console.error(e))

  }

}
module.exports = MyStrip;