import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RecoveryScreen from "../screens/RecoveryScreen";
import LockScreen from "../screens/LockScreen";
import PassResesScreen from "../screens/PassResetScreen";
import UserInfoScreen from "../screens/UserInfoScreen";

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  UserInfo: UserInfoScreen,
  Recovery: RecoveryScreen,
  PassReset: PassResesScreen,
  Lock: LockScreen
});

//This is the parent component called by the app.js file. It is the root of the navigation tree, and is
//thus responsible for creating the heirarchy of screens in the app. The order of screens is mainly for
//memory and ease of understanding purposes as we can easily navigate from any one screen to another.
export default createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainTabNavigator
  },
  {
    initialRouteName: "Auth"
  }
);
