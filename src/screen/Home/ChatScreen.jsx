import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import bot from "../../.././assets/bot.png";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.picContainer}>
        <Image style={styles.botPicture} source={bot} alt="bot" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  picContainer: {
    marginTop: 70,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  botPicture: {
    width: 150,
    height: 150,
  },
});

export default ChatScreen;
