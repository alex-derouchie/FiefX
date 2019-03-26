const initialState = {
  profileName: "Rylan Deck",
  //profilePicture: require(".../assets/images/RyRy.jpg"),
  dailyDistances: [3, 6, 7, 4, 10, 2, 0],
  dailyGoals: [0.6, 1, 1, 0.8, 1, 0.4, 0],
  weeklyDistance: 32,
  weeklyGoal: 35,
  achievements: [1, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
  signedIn: false,
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
      return Object.assign({}, state, {
        returnedData: action.payload
      });
    default:
      return state;
  }
};
