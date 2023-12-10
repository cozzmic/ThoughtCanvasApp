import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footerstyle}>
      <Text
        style={styles.footertext}
      >
        𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  footerstyle: {
    backgroundColor: "#fedae1",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "5%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  footertext:{
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    bottom: 10,
    color: "#FD2E2A",
    top: 0
  }
});

export default Footer;
