import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GuideItem from "../components/GuideItem";
import { StatusBar } from "expo-status-bar";
import ChatbotButton from "../components/Shared/ChatbotButton";
import { actData } from "../data";

const HabitsGuide = () => {

  const [transportationData, setTransportationData] = useState([]);
  const [electricityData, setElectricityData] = useState([]);

  useEffect(() => {
    const transportationItems = actData.filter(item => item.category === "Transportation");
    setTransportationData(transportationItems);
  
    const electricityItems = actData.filter(item => item.category === "Electricity");
    setElectricityData(electricityItems);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar style="dark" />
      <Text style={styles.sectionTitle}>Transportation</Text>
      {transportationData.map((data, index) => (
        <GuideItem data={data.content} key={index} />
      ))}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Electricity</Text>
        {electricityData.map((data, index) => (
          <GuideItem data={data.content} key={index} />
        ))}
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
  },
  sectionTitle: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    marginTop: 10,
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
});

export default HabitsGuide;
