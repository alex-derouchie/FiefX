const initialState = {
  themeColor: "",
  titleTextColor: "",
  headerTextColor: "",
  testColor: "",
  weeklyGoal: 5
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "WEEKLY_GOAL":
      return Object.assign({}, state, {
        weeklyGoal: action.payload
      });
    default:
      return state;
  }
};
