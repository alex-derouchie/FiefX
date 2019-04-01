export const updateGyro = newGyro => {
  return {
    type: "UPDATE_GYROSCOPE",
    payload: newGyro
  };
};
