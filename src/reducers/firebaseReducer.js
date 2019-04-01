const initialState = {
  age: 0,
  returnedData: "",
  city: "",
  dailyDistance: 0,
  weeklyDistance: 0,
  distanceGoal: 5,
  securityQ: "",
  securityA: "",
  tireSize: 24,
  bodyWeight: 138
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AGE":
      console.log("Updating age: ", action.payload);
      return Object.assign({}, state, {
        age: action.payload
      });
    case "UPDATE_CITY":
      console.log("Updating city: ", action.payload);
      return Object.assign({}, state, {
        city: action.payload
      });
    case "UPDATE_DDISTANCE":
      console.log("Updating daily distance: ", action.payload);
      return Object.assign({}, state, {
        dailyDistance: action.payload
      });
    case "UPDATE_WDISTANCE":
      console.log("Updating weekly distance: ", action.payload);
      return Object.assign({}, state, {
        weeklyDistance: action.payload
      });
    case "WEEKLY_GOAL":
      console.log("Updating Weekly Goal: ", action.payload);
      return Object.assign({}, state, {
        distanceGoal: action.payload
      });
    case "UPDATE_SQ":
      return Object.assign({}, state, {
        securityQ: action.payload
      });
    case "UPDATE_SA":
      return Object.assign({}, state, {
        securityA: action.payload
      });
    case "UPDATE_TIRESIZE":
      console.log("Updating tire size: ", action.payload);
      return Object.assign({}, state, {
        tireSize: action.payload
      });
    case "UPDATE_WEIGHT":
      console.log("Updating weight: ", action.payload);
      return Object.assign({}, state, {
        bodyWeight: action.payload
      });
    default:
      return state;
  }
};
