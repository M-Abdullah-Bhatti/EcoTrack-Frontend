import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const AddEmissionCategory = ({ navigation, route }) => {
  const { params } = route;

  const [subCategories, setSubCategories] = useState([]);

  const transport = [
    {
      image: "",
      text: "Train",
      icon: <Ionicons name="train" size={24} color="white" />,
    },
    {
      image: "",
      text: "Car",
      icon: <Ionicons name="ios-car-sharp" size={24} color="white" />,
    },
    {
      image: "",
      text: "Bus",
      icon: <Ionicons name="ios-bus-sharp" size={24} color="white" />,
    },
    {
      image: "",
      text: "Plane",
      icon: <Entypo name="aircraft-take-off" size={24} color="white" />,
    },
    {
      image: "",
      text: "Boat",
      icon: <Fontisto name="sait-boat" size={24} color="white" />,
    },
    {
      image: "",
      text: "MotorBike",
      icon: <FontAwesome5 name="motorcycle" size={24} color="white" />,
    },
  ];

  const meal = [
    {
      image: "",
      text: "High  Meat",
      icon: (
        <MaterialCommunityIcons name="food-turkey" size={24} color="white" />
      ),
    },
    {
      image: "",
      text: "Medium Meat",
      icon: (
        <MaterialCommunityIcons name="food-hot-dog" size={24} color="white" />
      ),
    },
    {
      image: "",
      text: "Low Meat",
      icon: (
        <MaterialCommunityIcons name="food-steak" size={24} color="white" />
      ),
    },
    {
      image: "",
      text: "Vegetarian",
      icon: (
        <MaterialCommunityIcons
          name="food-drumstick-off-outline"
          size={24}
          color="white"
        />
      ),
    },
    // {
    //   image: "",
    //   text: "Vegan",
    // },
  ];

  const food = [
    {
      image: "",
      text: "Red Meat",
      icon: (
        <MaterialCommunityIcons name="food-turkey" size={24} color="white" />
      ),
    },
    {
      image: "",
      text: "White Meat",
      icon: <MaterialIcons name="set-meal" size={24} color="white" />,
    },
    {
      image: "",
      text: "Coffee",
      icon: <Fontisto name="coffeescript" size={24} color="white" />,
    },
    {
      image: "",
      text: "Chocolate",
      icon: (
        <MaterialCommunityIcons name="spoon-sugar" size={24} color="white" />
      ),
    },
    {
      image: "",
      text: "Fish",
      icon: <FontAwesome5 name="fish" size={24} color="white" />,
    },
    {
      image: "",
      text: "Lamb",
      icon: <MaterialIcons name="goat" size={24} color="white" />,
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
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>{item.icon}</View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "white",
                      marginLeft: 10,
                    }}
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
