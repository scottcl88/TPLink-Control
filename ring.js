if (!process.env.RING_REFRESH_TOKEN) {
  throw new Error('RING_REFRESH_TOKEN environment variable is required');
}
//https://github.com/dgreif/ring

import { RingApi, RingDeviceType } from 'ring-client-api'

console.log("Starting ring api thing");
const ringApi = new RingApi({
  refreshToken: process.env.RING_REFRESH_TOKEN,

  // The following are all optional. See below for details
  cameraStatusPollingSeconds: 20,
});

console.log("Ring API initialized");

const locations = await ringApi.getLocations();
// console.log("Locations found: ", locations);
let location = locations[0];
const devices = await location.getDevices();
// console.log("devices found: ", devices);

const doorSensor = devices.find(device => device.data.deviceType === RingDeviceType.ContactSensor && device.name == "Patio Door");
console.log("DoorSensor found: ", doorSensor != null);
console.log(doorSensor.data) // object containing properties like zid, name, roomId, faulted, tamperStatus, etc.
doorSensor.onData.subscribe(data => {
    // called any time data is updated for this specific device
    console.log("DoorSensor Data Changed: ", data);
})