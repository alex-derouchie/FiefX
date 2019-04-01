export const updateTire = newTire => {
  return {
    type: "UPDATE_TIRESIZE",
    payload: newTire
  };
};
