import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const Button = ({ buttonText, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        width: "",
        marginTop: 10,
      }}
      onPress={onPress}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Text style={{ color: "white" }}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
