import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import SetGoalModalWithSlider from "../../components/SetGoalModalWithSlider";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";

const thresholdValues = {
  Food: 50,
  Transportation: 40,
  Meal: 20,
  Electricity: 100,
};

const GoalsStatusScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState([]);
  const [refetch, setIsRefetch] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchGoalsData();
  }, []);

  const fetchGoalsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/goal/weekly-data/${user._id}`
      );
      console.log("response.data ===> ", response.data);
      if (!response.data) {
        throw new Error("Failed to fetch goals data");
      }
      // const data = await response.json();
      // setUserGoals(response.data);
      // setUserEmissions(response.data.emissions);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching goals data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchAgain = () => {
    navigation.navigate("Main");
  };
  const handleSetGoal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const saveGoal = (percentage) => {
    console.log(
      `Saving goal for ${selectedCategory} with reduction percentage: ${percentage}`
    );
    setIsModalVisible(false);
    // You may want to update the backend with the new goal data here
  };

  const isGoalSetForCategory = (category) => {
    return data.some((goal) => goal.category === category);
  };

  const shouldShowSetGoalButton = (category) => {
    const currentEmissions = data[category] || 0;
    return (
      // !isGoalSetForCategory(category) &&
      currentEmissions > thresholdValues[category]
    );
  };

  const getEmissionsBeforeGoalPeriod = (category) => {
    const goal = data.find((goal) => goal.category === category);
    if (!goal) return 0; // Default to 0 if goal is not set
    return goal.emissionsBeforeGoalPeriod || 0;
  };

  const getTargetForCategory = (category) => {
    const goal = data.find((goal) => goal.category === category);
    if (!goal) return 0; // Default to 0 if goal is not set
    console.log("target ========== ", goal?.target);
    return goal?.target || 0;
  };

  const categories = ["Food", "Transportation", "Meal", "Electricity"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.cardContainer}>
          <UserDashboard isGoalScreen={true} />
          <Text style={{ fontWeight: "600", fontSize: 18 }}>GOALS</Text>
          {categories.map((category, index) => {
            const goal = data.find((goal) => goal.category === category);
            const currentEmissions = goal?.emissionsDuringGoalPeriod || 0;
            const previousEmissions = goal?.emissionsBeforeGoalPeriod || 0;

            {
              console.log(
                "currentEmissions: ",
                thresholdValues[category],
                category,
                user?.emissions[category]
              );
            }

            if (!isGoalSetForCategory(category)) {
              return (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{category}</Text>
                  <View style={styles.goal}>
                    <Text style={styles.goalText}>
                      This Month: {user?.emissions[category] || 0} kg
                    </Text>

                    <Text style={styles.goalText}>
                      Max Value: {thresholdValues[category]} kg
                    </Text>
                  </View>

                  <Button
                    title="Set Goal"
                    onPress={() => handleSetGoal(category)}
                    disabled={
                      thresholdValues[category] > user?.emissions[category] || 0
                        ? true
                        : false
                    }
                    style={{ backgroundColor: "green" }}
                  />
                </View>
              );
            }

            const emissionsBeforeGoalPeriod =
              getEmissionsBeforeGoalPeriod(category);
            const target = getTargetForCategory(category);

            return (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{category}</Text>
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressLine,
                      {
                        width: `${(currentEmissions / target) * 100}%`,
                        backgroundColor:
                          currentEmissions < target ? "green" : "red",
                      },
                    ]}
                  />
                </View>
                <View style={styles.goal}>
                  <Text style={styles.goalText}>
                    This Week: {currentEmissions.toFixed(0)} kg
                  </Text>
                  <Text style={styles.goalText}>
                    Goal: {target.toFixed(0)} kg
                  </Text>
                </View>

                <Text style={styles.goalText}>
                  Emissions Before Goal Period: {previousEmissions.toFixed(0)}{" "}
                  kg
                </Text>
              </View>
            );
          })}
        </View>
      )}
      <SetGoalModalWithSlider
        isVisible={isModalVisible}
        category={selectedCategory}
        hideModal={() => setIsModalVisible(false)}
        refetchAgain={refetchAgain}
        onSave={saveGoal}
        onCancel={() => setIsModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: 10,
    marginTop: 0,
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
