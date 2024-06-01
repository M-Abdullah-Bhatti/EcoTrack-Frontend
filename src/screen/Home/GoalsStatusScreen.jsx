import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SetGoalModal from "../../components/SetGoalModal";

const GoalsStatusScreen = () => {
  const goals = [
    { title: "Reduce car usage", achieved: true },
    { title: "Use public transport", achieved: false },
    { title: "Reduce energy consumption", achieved: true },
    { title: "Plant a tree", achieved: false },
    { title: "Recycle more", achieved: true },
  ];
  const [goalModalVisible, setgoalModalVisible] = useState(false);

  const lastWeekValue = 15500;
  const thisWeekValue = 12000;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Emissions</Text>
        <Text style={styles.balanceAmount}>3500.00 kg</Text>
      </View>
      <View style={styles.summary}>
        <View style={styles.incomeExpenseContainer}>
          <View
            style={[
              styles.incomeExpenseCard,
              lastWeekValue > thisWeekValue
                ? { borderColor: "red" }
                : { borderColor: "green" },
            ]}
          >
            <Text style={styles.incomeExpenseText}>Last Week</Text>
            <Text style={styles.incomeExpenseAmount}>{lastWeekValue} kg</Text>
            <AntDesign
              name={lastWeekValue < thisWeekValue ? "arrowdown" : "arrowup"}
              size={24}
              color={lastWeekValue > thisWeekValue ? "red" : "green"}
            />
          </View>
          <View
            style={[
              styles.incomeExpenseCard,
              thisWeekValue > lastWeekValue
                ? { borderColor: "red" }
                : { borderColor: "green" },
            ]}
          >
            <Text style={styles.incomeExpenseText}>This Week</Text>
            <Text style={styles.incomeExpenseAmount}>{thisWeekValue} kg</Text>
            <AntDesign
              name={thisWeekValue < lastWeekValue ? "arrowdown" : "arrowup"}
              size={24}
              color={thisWeekValue > lastWeekValue ? "red" : "green"}
            />
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Goals</Text>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goal}>
            <Text style={styles.goalText}>{goal.title}</Text>
            <Ionicons
              name={goal.achieved ? "checkmark-circle" : "close-circle"}
              size={24}
              color={goal.achieved ? "green" : "red"}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => setgoalModalVisible(true)}
        style={{
          backgroundColor: "green",
          width: "90%",
          borderRadius: 20,
          marginHorizontal: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 14, color: "white" }}> Open Modal</Text>
      </TouchableOpacity>
      <SetGoalModal
        isVisible={goalModalVisible}
        title="Goal 1"
        description="Plant more trees "
        hideModal={() => setgoalModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#e0f2f1",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#34a853",
  },
  headerText: {
    fontSize: 24,
    color: "white",
  },
  balanceCard: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#34a853",
    alignItems: "center",
  },
  balanceTitle: {
    fontSize: 18,
    color: "white",
  },
  balanceAmount: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  summary: {
    margin: 10,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incomeExpenseCard: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    borderWidth: 2,
    gap: 10,
  },
  incomeExpenseText: {
    fontSize: 16,
    color: "#34a853",
  },
  incomeExpenseAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    margin: 10,
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
