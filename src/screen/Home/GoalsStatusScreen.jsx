import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import UserDashboard from "./UserDashboard";

const GoalsStatusScreen = () => {
  const [goalsData, setGoalsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://ecotrack-dev.vercel.app/api/goal/weekly-data/${user._id}`
          );
          setGoalsData(response.data);
          console.log("GOALS: ", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [user._id])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.summary}></View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.cardContainer}>
          <UserDashboard isGoalScreen={true} />
          <Text style={{ fontWeight: "600", fontSize: 18 }}>GOALS</Text>
          {goalsData.map((goal, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{goal.category}</Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressLine,
                    {
                      width: `${
                        (goal.emissionsDuringGoalPeriod /
                          goal.emissionsBeforeStartDate) *
                        100
                      }%`,
                      backgroundColor:
                        goal.emissionsDuringGoalPeriod <
                        goal.emissionsBeforeStartDate
                          ? "green"
                          : "red",
                    },
                  ]}
                />
              </View>
              <View style={styles.goal}>
                <Text style={styles.goalText}>
                  Last Week: {goal.emissionsBeforeStartDate.toFixed(2)} kg
                </Text>
                <Text style={styles.goalText}>
                  Goal:{" "}
                  {goal.emissionsBeforeStartDate -
                    goal.emissionsBeforeStartDate *
                      (goal.percentage / 100)}{" "}
                  kg
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summary: {
    margin: 10,
    width: "100%",
  },
  cardContainer: {
    margin: 10,
  },
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#34a853",
    fontWeight: "bold",
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressLine: {
    flex: 1,
  },
  goal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  goalText: {
    fontSize: 16,
    color: "#34a853",
  },
});

export default GoalsStatusScreen;
