const initialState = {
  speed: 0,
  tachometer: 0,
  coords: {
    latitude: 56,
    longitude: 78
  },
  accelerometer: {
    accelX: 0,
    accelY: 0,
    accelZ: 0
  },
  gyroscope: {
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SPEED":
      return Object.assign({}, state, {
        speed: action.payload
      });
    case "UPDATE_COORDS":
      return Object.assign({}, state, {
        coords: action.payload
      });
    case "UPDATE_ACCELEROMETER":
      return Object.assign({}, state, {
        accelerometer: action.payload
      });
    case "UPDATE_GYROSCOPE":
      return Object.assign({}, state, {
        gyroscope: action.payload
      });
    case "UPDATE_TACHOMETER":
      return Object.assign({}, state, {
        tachometer: action.payload
      });
    default:
      return state;
  }
};
