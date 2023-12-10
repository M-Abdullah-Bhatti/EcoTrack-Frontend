import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AddEmissionCategory = ({ navigation, route }) => {
  const { params } = route;

  const [subCategories, setSubCategories] = useState([]);

  const transport = [
    {
      image: "",
      text: "Train",
    },
    {
      image: "",
      text: "Car",
    },
    {
      image: "",
      text: "Bus",
    },
    {
      image: "",
      text: "Plane",
    },
    {
      image: "",
      text: "Boat",
    },
    {
      image: "",
      text: "MotorBike",
    },
  ];

  const meal = [
    {
      image: "",
      text: "High  Meat",
    },
    {
      image: "",
      text: "Medium Meat",
    },
    {
      image: "",
      text: "Low Meat",
    },
    {
      image: "",
      text: "Vegetarian",
    },
    {
      image: "",
      text: "Vegan",
    },
  ];

  const food = [
    {
      image: "",
      text: "Red Meat",
    },
    {
      image: "",
      text: "White Meat",
    },
    {
      image: "",
      text: "Coffee",
    },
    {
      image: "",
      text: "Chocolate",
    },
    {
      image: "",
      text: "Fish",
    },
    {
      image: "",
      text: "Lamb",
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      if (params.category == "Transportation") {
        setSubCategories(transport);
      }
      if (params.category == "Food") {
        setSubCategories(food);
      }
      if (params.category == "Meal") {
        setSubCategories(meal);
      }
      if (params.category == "Electricity") {
        // setSubCategories(meal);
      }
    }, [])
  );

  const arrow = ">";
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select a sub-category
        </Text>

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          {subCategories.length > 0 &&
            subCategories.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  backgroundColor: "#046958",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "green",
                }}
                onPress={() =>
                  navigation.navigate("AddEmission", {
                    category: params.category,
                    subCategory: item,
                  })
                }
              >
                <View>
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "white" }}
                  >
                    {item.text}
                  </Text>
                </View>
                <View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddEmissionCategory;
