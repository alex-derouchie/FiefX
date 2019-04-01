import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";
import "@firebase/firestore";
import "@firebase/util";

import store from "./store";
import * as actions from "./actions";

//Database Module
//Class Variables
var databaseInstance; //The active instance of the database (should be loaded on application start)

//Static strings used to fix database locations
const userStorageCollectionID = "UserStorage"; //An L1 collection which stores all users (and data) - this stores everything
const userListDocumentID = "UserList"; //An L1 document which stores all user IDs
const dataCollectionRunID = "Data Collection Run"; //An L2 collection which stores the data collection by the hardware
const userInfoCollectionID = "UserInfo"; //An L2 collection which stores user data
const passwordDocumentID = "PasswordDoc"; //Not Needed (because of Google Sign In)

const accelerometerDocID = "ACCEL";
const gyroscopeDocID = "GYRO";
const gpsDocID = "GPS";
const tacID = "TAC";

//Test Code
function getCurrentUser() {
  console.log("Printing Current User");
  console.log(currentUser);
}

function testCreateAccount() {
  var email1 = "cegcasptone_test@outlook.com";
  var password1 = "thisIsatest";

  var email2 = "cegcapstone@gmail.com";
  var password2 = "FiefX2020";

  createNewAccount(email1, password1);
}

function testSignIn() {
  var email1 = "cegcasptone_test@outlook.com";
  var password1 = "thisIsatest";

  var email2 = "cegcapstone@gmail.com";
  var password2 = "FiefX2020";

  signInWithParams(email1, password1);
  console.log(currentUser);
}

function runTest() {
  console.log("Running Test");

  //Sample Auth data
  var email1 = "cegcasptone_test@outlook.com";
  var password1 = "thisIsatest";

  var email2 = "cegcapstone@gmail.com";
  var password2 = "FiefX2020";
  //Sample User Data
  var userInfoType0 = "Bike Name";
  var userInfoType1 = "User Weight";
  var userInfo0 = "Name of Bike";
  var userInfo0_Edit = "New Name of Bike";
  var weight0 = "100";
  var weight1 = "86";
  //Sample Collected Data
  var infoType0 = "Accelerometer Data";
  var infoType1 = "Speed Data";
  var runID0 = "run 0";
  var runID1 = "run 1";
  var dataType0_0 = "Accelerometer String 0";
  var dataType0_0Edit = "Edited Accelerometer String 0";
  var dataType0_1 = "Accelerometer String 1";
  var dataType0_1Edit = "Edited Accelerometer String 1";
  var dataType1_0 = "Gyro String 0";
  var dataType1_0Edit = "Edited Gyro String 0";
  var dataType1_1 = "Gyro String 1";
  var dataType1_1Edit = "Edited Gyro String 1";

  //Test Sequence 1
  //Sign in
  signInWithParams(email1, password1);

  //Initialize the Collection Documents
  //initializeCollectionDocuments();

  //Add 2 Datapoint
  addCollectedData(accelerometerDocID, runID0, dataType0_0);
  addCollectedData(accelerometerDocID, runID1, dataType0_1);
  addCollectedData(gyroscopeDocID, runID0, dataType1_0);
  addCollectedData(gyroscopeDocID, runID1, dataType1_1);
  //Read the Added Data for Type 0
  readCollectedData(infoType0);
  readCollectedData(gyroscopeDocID);
  //Edit the Data
  addCollectedData(accelerometerDocID, runID0, dataType0_0Edit);
  addCollectedData(accelerometerDocID, runID1, dataType0_1Edit);
  addCollectedData(gyroscopeDocID, runID0, dataType1_0Edit);
  addCollectedData(gyroscopeDocID, runID1, dataType1_1Edit);
  //Add Some User Information
  addNewUserInformation(userInfoType0, userInfoType0);
  addNewUserInformation(userInfoType1, weight0);
  //Update Some User Information
  updateUserInformation(userInfoType0, userInfoType1);
  updateUserInformation(userInfoType1, weight1);
}

//Authentication Code
//Auth Globals
var googleAuthHandler;
var currentUser;
var active_uid;
//Sign In with google-email-authentication using an email and password
//Parameters:   email - the google email
//              password - the email for the google email
//Outputs:      none
export function signInWithParams(email, password) {
  console.log("Trying to Sign In");
  //Initialize the auth handler if it does not exist
  if (googleAuthHandler == null) {
    initializeFirebase();
    console.log("Initializing Firebase");
  }
  //Get the auth provider from the instantiation of firebase
  //var provider = new firebase.auth.GoogleAuthProvider();

  //Sign in the user using the function parameters
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(result) {
      //Get the token
      //var token = result.credential().accessToken;
      currentUser = result.user;
      active_uid = currentUser.uid;

      store.dispatch(actions.updateSignIn(true));

      //Sign In Successful
      console.log("Sign in Worked");
      console.log(active_uid);
      //console.log(token);
    })
    .catch(function(error) {
      //Sign In Error
      console.log("Sign in error");

      store.dispatch(actions.updateSignIn(false));

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  console.log("Outside of Sign In Function");
}
//Add a new account which can be authenticated using the sign in method above
//Parameters:   email - the google email
//              password - the email for the google email
//Outputs:      none
export function createNewAccount(email, password) {
  console.log("Trying to Sign In");
  //Initialize the auth handler if it does not exist
  if (googleAuthHandler == null) {
    initializeFirebase();
    console.log("Initializing Firebase");
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      //Sign in the user
      currentUser = result.user;
      active_uid = currentUser.uid;

      store.dispatch(actions.updateSignIn(true));

      //Create the collection documents
      initializeCollectionDocuments();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}
//Sign Out
//Parameters:   none
//Outputs:      none
export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function(result) {
      //Reset the Auth Globals
      currentUser = null;
      active_uid = null;

      store.dispatch(actions.updateSignIn(false));

      console.log("Signed Out");
      //Sign out successful
    })
    .catch(function(error) {
      //Error signing out
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}

//Database Code
//App Methods
//User Information Access Methods (user things)
//Add some piece of user information for the active user, denoted by the key-value pair - if the user does not exist, create the user and the document
//Parameters:   infoType - the type of information being stored, is the "key" in the key-value pair
//              infoVal - the value of the information being stored, is the "value" in the key-value pair
//Outputs:      none
export function addNewUserInformation(infoType, infoVal) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    writeDataToL2Document(
      userStorageCollectionID,
      active_uid,
      userInfoCollectionID,
      infoType,
      infoType,
      infoVal
    );
  }
}
//Read document under the user information folder for the active user. Folder is identified by the information type (infoType)
//Parameters:   infoType - the identifier for the retrieved document
//Outputs:      none
export function readUserInformation(infoType) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    var readVal = readFromL2Document(
      userStorageCollectionID,
      active_uid,
      userInfoCollectionID,
      infoType
    );
    setTimeout(() => {
      console.log("ReadVal: ", readVal);
      return readVal;
    }, 1500);
  }
}

//Update some piece of user information for the active user, denoted by the key-value pair
//Parameters:   infoType - The type of information stored, identifies the document and is used as the key value
//              updateInfoVal - The value of the updated datapoint
//Outputs:      none
export function updateUserInformation(infoType, updatedInfoVal) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      userInfoCollectionID,
      infoType,
      infoType,
      updatedInfoVal
    );
  }
}

//User Data Collection Methods (for reading from the hardware)
//Initialize the documents where the different types of data will be stored
//Parameters:   none
//Outputs:      none
export function initializeCollectionDocuments() {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Set the default values for each folder (value will be ignored in analysis)
    const defaultVal = "DEFAULT_VALUE";
    const defaultKey = "DEFAULT";

    //Create Documents for:
    //Accelerometer
    createNewDataDocument(accelerometerDocID, defaultKey, defaultVal);
    //Gyroscope
    createNewDataDocument(gyroscopeDocID, defaultKey, defaultVal);
    //GPS
    createNewDataDocument(gpsDocID, defaultKey, defaultVal);
    //Tachometer
    createNewDataDocument(tacID, defaultKey, defaultVal);
  }
}
//Data Specfic Getters and Setters
//ACCELEROMETER DATA
//Add some accelerometer data to the database for the signed in user - user account must be initialized before calling
//Parameters:   timeEpoch - The time the data value was recorded - is used as the key value when storing the data
//              dataValue - The value of the data being stored
//Outputs:      none
export function addAccelerometerData(timeEpoch, dataValue) {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      accelerometerDocID,
      timeEpoch,
      dataValue
    );
  } else {
    console.log("No one is signed in");
  }
}
//Add some accelerometer data to the database for the signed in user - user account must be initialized before calling
//Parameters:   none
//Outputs:      A list of key value pairs representing the accelerometer data stored in the system
export function getAccelerometerData() {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    return readFromL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      accelerometerDocID
    );
  } else {
    console.log("No one is signed in");
  }
}
//GYROSCOPE DATA
//Add some gyroscope data to the database for the signed in user - user account must be initialized before calling
//Parameters:   timeEpoch - The time the data value was recorded - is used as the key value when storing the data
//              dataValue - The value of the data being stored
//Outputs:      none
export function addGyroscopeData(timeEpoch, dataValue) {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      gyroscopeDocID,
      timeEpoch,
      dataValue
    );
  } else {
    console.log("No one is signed in");
  }
}
//Add some gyroscope data to the database for the signed in user - user account must be initialized before calling
//Parameters:   none
//Outputs:      A list of key value pairs representing the gyroscope data stored in the system
export function getGyroscopeData() {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    return readFromL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      gyroscopeDocID
    );
  } else {
    console.log("No one is signed in");
  }
}
//GPS
//Add some GPS data to the database for the signed in user - user account must be initialized before calling
//Parameters:   timeEpoch - The time the data value was recorded - is used as the key value when storing the data
//              dataValue - The value of the data being stored
//Outputs:      none
export function addGPSData(timeEpoch, dataValue) {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      gyroscopeDocID,
      timeEpoch,
      dataValue
    );
  } else {
    console.log("No one is signed in");
  }
}
//Add some GPS data to the database for the signed in user - user account must be initialized before calling
//Parameters:   none
//Outputs:      A list of key value pairs representing the GPS data stored in the system
export function getGPSData() {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    return readFromL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      gpsDocID
    );
  } else {
    console.log("No one is signed in");
  }
}
//TACHOMETER
//Add some tachometer data to the database for the signed in user - user account must be initialized before calling
//Parameters:   timeEpoch - The time the data value was recorded - is used as the key value when storing the data
//              dataValue - The value of the data being stored
//Outputs:      none
export function addTachometerData(timeEpoch, dataValue) {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      tacID,
      timeEpoch,
      dataValue
    );
  } else {
    console.log("No one is signed in");
  }
}
//Add some tachometer data to the database for the signed in user - user account must be initialized before calling
//Parameters:   none
//Outputs:      A list of key value pairs representing the tachometer data stored in the system
export function getTachometerData() {
  //Make sure a user is signed in
  if (active_uid != null) {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    return readFromL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      tacID
    );
  } else {
    console.log("No one is signed in");
  }
}

//GENERAL DATA MODIFICATION FUNCTIONS
//Create a new document under the data collection run section of the database for the active user - also sets the default key-value pair for this document
//Parameters:   dataType - the type of information which will be stored in this document - also the identifier for the document
//              runID - an enumerated value which idenifies which collection point exists - serves as the key in the key-value pair
//              value - the value of the key-value pair
//Outputs:      none
export function createNewDataDocument(dataType, runID, value) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    writeDataToL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      dataType,
      runID,
      value
    );
  }
}
//Add collected data for to an existing document in the database for the active user in the form of a key-value pair
//Also used to update a value in the database in the form of a key-value pair
//Parameters:   dataType - the identifier for the document where the data will be added
//              runID - the key in the key-value pair
//              value - the value in the key-value pair
//Outputs:      none
export function addCollectedData(dataType, runID, updatedVal) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    updateL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      dataType,
      runID,
      updatedVal
    );
  }
}
//Read collected data in the database from a document identified by the information type (infoType)
//Parameters:   dataType - the identifier for the document you want to read from
//Outputs:      none
export function readCollectedData(dataType) {
  if (active_uid == null) {
    console.log("No One Sign In");
  } else {
    //Add the user information into the L2 document under the user information collection - the document will be titled using the UID of the current user
    return readFromL2Document(
      userStorageCollectionID,
      active_uid,
      dataCollectionRunID,
      dataType
    );
  }
}

//Utility Methods
export function initializeFirebase() {
  databaseInstance = firebase.firestore();
  googleAuthHandler = firebase.auth;
}

//"Write to" database functions

//Generic L1 document
function writeDataToL1Document(collectionID_L1, documentID_L1, key, value) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Write the data to the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .set({
      key: value
    })
    .then(function() {
      console.log("Document written with to firebase");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//Generic L2 document
function writeDataToL2Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2,
  key,
  value
) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Write the data to the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .set({
      key: value
    })
    .then(function() {
      console.log("Document written with to firebase");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//Generic L3 document
function writeDataToL3Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2,
  collectionID_L3,
  documentID_L3,
  key,
  value
) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Write the data to the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .collection(collectionID_L3)
    .doc(documentID_L3)
    .set({
      key: value
    })
    .then(function() {
      console.log("Document written with to firebase");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
//"Read from" database functions
//Generic L1 Document
function readFromL1Document(collectionID_L1, documentID_L1) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Read the data from the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //The document exists
        //Do something with the data
        console.log("Document Data: ", doc.data());
        return doc.data();
      } else {
        //The document does not exist
        console.log("No document exists at this location");
      }
    });
}
//Generic L2 Document
function readFromL2Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2
) {
  //User is signed in
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Read the data from the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //The document exists
        //Do something with the data
        console.log("Document Data: ", doc.data());

        //store.dispatch(actions.updateReturn(doc.data()));
        updateRedux(documentID_L2, doc.data());

        return doc.data();
      } else {
        //The document does not exist
        console.log("No document exists at this location");
      }
    });
}

function updateRedux(infoType, infoVal) {
  if (infoType == "Name") {
    console.log("Name");
    store.dispatch(actions.updateName(infoVal.key));
  } else if (infoType == "Age") {
    store.dispatch(actions.updateAge(infoVal.key));
  } else if (infoType == "City") {
    store.dispatch(actions.updateCity(infoVal.key));
  } else if (infoType == "DailyDistance") {
    store.dispatch(actions.updateDDistance(infoVal.key));
  } else if (infoType == "WeeklyGoal") {
    store.dispatch(actions.goalChange(infoVal.key));
  } else if (infoType == "Security Question") {
    store.dispatch(actions.updateSQ(infoVal.key));
  } else if (infoType == "SecurityQAnswer") {
    store.dispatch(actions.updateSA(infoVal.key));
  } else if (infoType == "TireSize") {
    store.dispatch(actions.updateTire(infoVal.key));
  } else if (infoType == "WeeklyDistance") {
    store.dispatch(actions.updateWDistance(infoVal.key));
  } else if (infoType == "bodyWeight") {
    store.dispatch(actions.updateWeight(infoVal.key));
  }
}

//Generic L3 Document
function readFromL3Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2,
  collectionID_L3,
  documentID_L3
) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Read the data from the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .collection(collectionID_L3)
    .doc(documentID_L3)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //The document exists
        //Do something with the data
        console.log("Document Data: ", doc.data());
        return doc.data();
      } else {
        //The document does not exist
        console.log("No document exists at this location");
      }
    });
}

//"Update" database functions
//Generic L1 Document
function updateL1Document(collectionID_L1, documentID_L1, key, updatedVal) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Update data in the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .update({
      key: updatedVal
    })
    .then(function() {
      console.log("Document Updated");
    })
    .catch(function(error) {
      console.error("Error Updating Document: ", error);
    });
}
//Generic L2 Document
function updateL2Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2,
  key,
  updatedVal
) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Update data in the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .update({
      key: updatedVal
    })
    .then(function() {
      console.log("Document Updated");
    })
    .catch(function(error) {
      console.error("Error Updating Document: ", error);
    });
}
//Generic L3 Document
function updateL3Document(
  collectionID_L1,
  documentID_L1,
  collectionID_L2,
  documentID_L2,
  collectionID_L3,
  documentID_L3,
  key,
  updatedVal
) {
  //Make sure the database has been initialized
  if (databaseInstance == null) {
    initializeFirebase();
  } //Initialize the database if it is not already initialized
  //Update data in the database
  databaseInstance
    .collection(collectionID_L1)
    .doc(documentID_L1)
    .collection(collectionID_L2)
    .doc(documentID_L2)
    .collection(collectionID_L3)
    .doc(documentID_L3)
    .update({
      key: updatedVal
    })
    .then(function() {
      console.log("Document Updated");
    })
    .catch(function(error) {
      console.error("Error Updating Document: ", error);
    });
}
