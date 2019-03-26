import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../constants/Colors";

/*
This component renders a react-native-vector-icons object with a name property, 
as well as changing the colour of the Icon when focused on the tab bar. Used to
display and highlight the icons on the bottom tab of the application.
*/
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={this.props.size}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
