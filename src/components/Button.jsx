import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const Button = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#bcf5bc",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
      }}
      onPress={() => navigation.navigate("AddEmission")}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}
      >
        <FontAwesome5 name="plane" size={24} color="black" />
        <Text>{"item.text"}</Text>
      </View>
      <View>
        <Text>{"arrow"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
