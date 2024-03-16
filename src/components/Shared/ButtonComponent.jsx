import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const Button = ({ buttonText, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: backgroundColor,
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 5,
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
        <Text style={{ color: "white", fontSize: 16, fontWeight: 500 }}>
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
