const initialState = {
  profileName: " ",
  dailyDistances: [6.5, 5.5, 7.5, 8, 2, 0.2, 0.2],
  friendDistances: [16.5, 13, 14.2, 10],
  dailyGoals: [0.6, 1, 1, 0.8, 1, 0.4, 0],
  weeklyDistance: 32,
  achievements: [0.2, 0.9, 0.5, 1.0, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
  signedIn: false,
  collectingData: false,
  returnedData: "",
  curPass: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SIGNIN":
      console.log("updating SignIn...");
      return Object.assign({}, state, {
        signedIn: action.payload
      });
    case "UPDATE_NAME":
      console.log("Updating Name...");
      return Object.assign({}, state, {
        profileName: action.payload
      });
    case "UPDATE_RETURN":
      console.log("Reducer: ", action.payload);
      return Object.assign({}, state, {
        returnedData: action.payload
      });
    case "COLLECT_DATA":
      return Object.assign({}, state, {
        collectingData: action.payload
      });
    case "UPDATE_PASS":
      console.log("PassUpdate");
      return Object.assign({}, state, {
        curPass: action.payload
      });
    default:
      return state;
  }
};
