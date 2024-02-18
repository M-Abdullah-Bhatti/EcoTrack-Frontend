import { TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const ChatbotButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen")}
        style={styles.button}
      >
        <MaterialIcons name="chat" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 55,
    right: 15,
  },
  button: {
    backgroundColor: "#46A667",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
});

export default ChatbotButton;
