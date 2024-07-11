import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button } from "react-native";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import SetGoalModalWithSlider from "../../components/SetGoalModalWithSlider";

const thresholdValues = {
  Food: 50,
  Transportation: 40,
  Meal: 20,
  Electricity: 100
};

const GoalsStatusScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [userEmissions, setUserEmissions] = useState({});
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchGoalsData();
  }, []);

  const fetchGoalsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://ecotrack-backend.vercel.app/api/goal/weekly-data/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch goals data');
      }
      const data = await response.json();
      setUserGoals(data.goals);
      setUserEmissions(data.emissions);
    } catch (error) {
      console.error('Error fetching goals data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetGoal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const saveGoal = (percentage) => {
    console.log(`Saving goal for ${selectedCategory} with reduction percentage: ${percentage}`);
    setIsModalVisible(false);
    // You may want to update the backend with the new goal data here
  };

  const isGoalSetForCategory = (category) => {
    return userGoals.some(goal => goal.category === category);
  };

  const shouldShowSetGoalButton = (category) => {
    const currentEmissions = userEmissions[category] || 0;
    return (
      !isGoalSetForCategory(category) &&
      currentEmissions > thresholdValues[category]
    );
  };

  const getEmissionsBeforeGoalPeriod = (category) => {
    const goal = userGoals.find(goal => goal.category === category);
    if (!goal) return 0; // Default to 0 if goal is not set
    return goal.emissionsBeforeGoalPeriod || 0;
  };

  const getTargetForCategory = (category) => {
    const goal = userGoals.find(goal => goal.category === category);
    if (!goal) return 0; // Default to 0 if goal is not set
    return goal.target || 0;
  };

  const categories = ['Food', 'Transportation', 'Meal', 'Electricity'];

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
            const goal = userGoals.find(goal => goal.category === category);
            const currentEmissions = userEmissions[category] || 0;

            if (!isGoalSetForCategory(category)) {
              return (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{category}</Text>
                  <View style={styles.goal}>
                    <Text style={styles.goalText}>
                      This Week: {currentEmissions.toFixed(2)} kg
                    </Text>
                    <Text style={styles.goalText}>
                      Max Value: {thresholdValues[category]} kg
                    </Text>
                  </View>
                  <Button
                    title="Set Goal"
                    onPress={() => handleSetGoal(category)}
                    style={{ backgroundColor: 'green' }}
                  />
                </View>
              );
            }

            const emissionsBeforeGoalPeriod = getEmissionsBeforeGoalPeriod(category);
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
                        backgroundColor: currentEmissions < target
                          ? "green"
                          : "red",
                      },
                    ]}
                  />
                </View>
                <View style={styles.goal}>
                  <Text style={styles.goalText}>
                    This Week: {currentEmissions.toFixed(2)} kg
                  </Text>
                  <Text style={styles.goalText}>
                    Goal: {target.toFixed(2)} kg
                  </Text>
                  <Text style={styles.goalText}>
                    Emissions Before Goal Period: {emissionsBeforeGoalPeriod.toFixed(2)} kg
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
      <SetGoalModalWithSlider
        isVisible={isModalVisible}
        category={selectedCategory}
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
