export const updateAccel = newAccel => {
  return {
    type: "UPDATE_ACCELEROMETER",
    payload: newAccel
  };
};
