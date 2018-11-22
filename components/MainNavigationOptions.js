import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import TabBarIcon from "../components/TabBarIcon";

export default class NavigationOptions extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.container}>
        {/*This View balances the flex value from the LockIcon on the other side of the logo.*/}
        <View style={styles.lockIcon} />
        <View style={styles.logo}>
          <Image
            source={require("../assets/images/FiefX.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.lockIcon}>
          {/*This TouchableOpacity component is responsible for displaying the lock button in the header as a 
          button that will alert the user asking if they want to initiate the locking procedure or not.*/}
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Are you sure?",
                "Pressing 'Lock' will put FiefX into security mode.",
                [
                  { text: "Cancel" },
                  {
                    text: "Lock",
                    onPress: () => navigation.navigate("Lock")
                  }
                ],
                { cancelable: false }
              )
            }
          >
            <TabBarIcon name={"lock"} size={26} />
          </TouchableOpacity>
        </View>
      </View>
    )
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxHeight: "9%",
    elevation: 100
  },
  logo: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  lockIcon: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginTop: 3,
    marginBottom: 2
  }
});
