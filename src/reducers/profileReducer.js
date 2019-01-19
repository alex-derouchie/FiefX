const initialState = {
    profileName: "Rylan Deck",
    //profilePicture: require(".../assets/images/RyRy.jpg"),
    dailyDistances: [3,6,7,4,10,2,0],
    dailyGoals: [0.6,1,1,0.8,1,0.4,0],
    weeklyDistance: 32,
    weeklyGoal: 35,
    achievements: [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50]
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}
