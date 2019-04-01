export const updateTach = newTach => {
  return {
    type: "UPDATE_TACHOMETER",
    payload: newTach
  };
};
