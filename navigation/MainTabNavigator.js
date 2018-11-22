import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SocialScreen from "../screens/SocialScreen";
import MapScreen from "../screens/MapScreen";

/*
This file contains all the logic and styling of the bottom navigation bar,
which is the main navigation component of the app. It also initializes and
exports all the screens that correspond to the tab buttons on the bottom and
the child screens of those components.

*/
//Home Button
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Map: MapScreen
});
HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"home"} size={26} />
  )
};

//Social Button
const SocialStack = createStackNavigator({
  Social: SocialScreen
});
SocialStack.navigationOptions = {
  tabBarLabel: "Social",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"people"} size={26} />
  )
};

//Analytics Button
const StatsStack = createStackNavigator({
  Stats: StatsScreen
});
StatsStack.navigationOptions = {
  tabBarLabel: "Analytics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"equalizer"} size={26} />
  )
};

//Lock Button
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});
SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"settings"} size={26} />
  )
};

//This allows the rest of the project to see the components of the navigation bar.
//This export is sent to AppNavigator to be rendered within App.js
export default (MainTabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Social: SocialStack,
  Stats: StatsStack,
  Settings: SettingsStack
}));
