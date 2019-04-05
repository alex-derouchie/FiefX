const initialState = {
  themeColor: "",
  titleTextColor: "",
  headerTextColor: "",
  testColor: "",
  dailyGoal: 5,
  lastSQ: "",
  lastSA: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "WEEKLY_GOAL":
      return Object.assign({}, state, {
        dailyGoal: action.payload
      });
    case "UPDATE_SQ":
      return Object.assign({}, state, {
        lastSQ: action.payload
      });
    case "UPDATE_SA":
      return Object.assign({}, state, {
        lastSA: action.payload
      });
    default:
      return state;
  }
};
