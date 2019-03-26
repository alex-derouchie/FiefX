export const goalChange = newGoal => {
  console.log("goal change");
  return {
    type: "WEEKLY_GOAL",
    payload: newGoal
  };
};
