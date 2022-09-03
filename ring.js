//https://github.com/dgreif/ring

import { RingApi, RingDeviceType } from 'ring-client-api'

console.log("Starting ring api thing");
const ringApi = new RingApi({
  refreshToken: 'eyJhbGciOiJIUzUxMiIsImprdSI6Ii9vYXV0aC9pbnRlcm5hbC9qd2tzIiwia2lkIjoiYzEyODEwMGIiLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE2NjE4NjY3MTYsImlzcyI6IlJpbmdPYXV0aFNlcnZpY2UtcHJvZDp1cy1lYXN0LTE6ZjEwMmRlOWIiLCJyZWZyZXNoX2NpZCI6InJpbmdfb2ZmaWNpYWxfYW5kcm9pZCIsInJlZnJlc2hfc2NvcGVzIjpbImNsaWVudCJdLCJyZWZyZXNoX3VzZXJfaWQiOjMzODQyOTU3LCJybmQiOiJBclRGMzVDSGVyS3E3QSIsInNlc3Npb25faWQiOiJlNWVlZThjYy1lMmY3LTQ5OTUtOTZkYS04YmY1OTQyZThlOGUiLCJ0eXBlIjoicmVmcmVzaC10b2tlbiJ9.Ke7Sy6K6y4bDogSy7oOKc-wjs1LuChr1yYETgypJ2BQXmyAvbyUVcgNBs-sqVw24kFIG1d8JCYooyjPMF3r8VA',

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