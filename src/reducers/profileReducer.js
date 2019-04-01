const initialState = {
  profileName: "Rylan Deck",
  //profilePicture: require(".../assets/images/RyRy.jpg"),
  dailyDistances: [3, 6, 7, 4, 10, 2, 0.2],
  friendDistances: [16.5, 13, 14.2, 10],
  dailyGoals: [0.6, 1, 1, 0.8, 1, 0.4, 0],
  weeklyDistance: 32,
  achievements: [1, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
  signedIn: false,
  collectingData: false,
  returnedData: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SIGNIN":
      console.log("updating SignIn...");
      return Object.assign({}, state, {
        signedIn: action.payload
      });
    case "UPDATE_NAME":
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
    default:
      return state;
  }
};
