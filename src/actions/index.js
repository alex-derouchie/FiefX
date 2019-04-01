//index.js in the actions folder essentially exports all actions from the actions folder,
//meaning there is no need to import individual actions within React Component
export * from "./weeklyGoalAction";
export * from "./updateSpeed";
export * from "./btActions/updateCoords";
export * from "./btActions/updateAccelerometer";
export * from "./btActions/updateGyroscope";
export * from "./btActions/updateTach";
export * from "./updateSignInStatus";
export * from "./updateName";
export * from "./updateReturnData";
export * from "./firebaseActions/updateAge";
export * from "./firebaseActions/updateCity";
export * from "./firebaseActions/updateDDistance";
export * from "./firebaseActions/updateSA";
export * from "./firebaseActions/updateSQ";
export * from "./firebaseActions/updateTire";
export * from "./firebaseActions/updateWDistance";
export * from "./firebaseActions/updateWeight";
export * from "./collectData";
