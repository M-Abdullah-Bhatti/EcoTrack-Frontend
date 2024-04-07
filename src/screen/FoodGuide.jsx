import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React from "react";
import GuideItem from "../components/GuideItem";
import { StatusBar } from "expo-status-bar";
import ChatbotButton from "../components/Shared/ChatbotButton";

const meatHabits = [
  {
    title: "Reduce meat consumption",
    content: {},
  },
  {
    title: "Eat lean meat",
    content: {},
  },
  {
    title: "Purchase meat from local producers",
    content: {},
  },
];

const vegetableHabits = [
  {
    title: "Make a compost box",
    content: {},
  },
  {
    title: "Eat seasonal vegetables",
    content: {},
  },
  {
    title: "Grow vegetables at home",
    content: {},
  },
];

const FoodGuide = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <StatusBar style="dark" />
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 10,
          fontSize: 24,
          fontFamily: "PoppinsSemiBold",
          marginTop: 10,
        }}
      >
        Meat
      </Text>
      {meatHabits.map((data, index) => (
        <GuideItem data={data} key={index} />
      ))}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#46A667",
          width: 150,
          alignItems: "center",
          paddingVertical: 6,
          borderRadius: 100,
          marginTop: 12,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#46A667",
            fontFamily: "PoppinsSemiBold",
          }}
        >
          See all
        </Text>
      </TouchableOpacity>

      <View style={{ width: "100%", alignItems: "center", marginTop: 12 }}>
        <Text
          style={{
            textAlign: "center",
            paddingVertical: 10,
            fontSize: 24,
            fontFamily: "PoppinsSemiBold",
            marginTop: 10,
          }}
        >
          Vegetables
        </Text>
        {vegetableHabits.map((data, index) => (
          <GuideItem data={data} key={index} />
        ))}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#46A667",
            width: 150,
            alignItems: "center",
            paddingVertical: 6,
            borderRadius: 100,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#46A667",
              fontFamily: "PoppinsSemiBold",
            }}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>
      {/* <ChatbotButton /> */}
    </SafeAreaView>
  );
};

export default FoodGuide;
