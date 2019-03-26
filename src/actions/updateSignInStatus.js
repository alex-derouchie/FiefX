export const updateSignIn = newStatus => {
  return {
    type: "UPDATE_SIGNIN",
    payload: newStatus
  };
};
