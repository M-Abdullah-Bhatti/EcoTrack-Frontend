import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GuideItem from "../components/GuideItem";
import { StatusBar } from "expo-status-bar";
import ChatbotButton from "../components/Shared/ChatbotButton";
import { actData } from "../data";

const FoodGuide = () => {

  const [foodData, setFoodData] = useState([]);
  const [transportationData, setTransportationData] = useState([]);
  const [electricityData, setElectricityData] = useState([]);
  const [mealsData, setMealsData] = useState([]);

  // Set the data for each category
  useEffect(() => {
    const foodItems = actData.filter(item => item.category === "Food");
    setFoodData(foodItems);
    
    const transportationItems = actData.filter(item => item.category === "Transportation");
    setTransportationData(transportationItems);
  
    const electricityItems = actData.filter(item => item.category === "Electricity");
    setElectricityData(electricityItems);
  
    const mealsItems = actData.filter(item => item.category === "Meal");
    setMealsData(mealsItems);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      <Text style={styles.sectionTitle}>Food</Text>
      {foodData.map((data, index) => (
        <GuideItem data={data.content} key={index} />
      ))}
      {/* <TouchableOpacity
        style={styles.seeAllButton}
      >
        <Text style={styles.seeAllButtonText}>See all</Text>
      </TouchableOpacity> */}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Meal</Text>
        {mealsData.map((data, index) => (
          <GuideItem data={data.content} key={index} />
        ))}
        {/* <TouchableOpacity
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity> */}
      </View>
      <ChatbotButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    marginTop: 10,
  },
  seeAllButton: {
    borderWidth: 1,
    borderColor: "#46A667",
    width: 150,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 100,
    marginTop: 12,
    alignSelf: 'center',
  },
  seeAllButtonText: {
    fontSize: 18,
    color: "#46A667",
    fontFamily: "PoppinsSemiBold",
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
});

export default FoodGuide;
