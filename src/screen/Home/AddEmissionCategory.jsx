import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { food, meal, transport } from "../../data";

const AddEmissionCategory = ({ navigation, route }) => {
  const { params } = route;

  const [subCategories, setSubCategories] = useState([]);

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

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select a sub-category
        </Text>

        <ScrollView
          style={{
            marginVertical: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
          showsVerticalScrollIndicator={false}
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
                  marginBottom: 12,
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddEmissionCategory;
