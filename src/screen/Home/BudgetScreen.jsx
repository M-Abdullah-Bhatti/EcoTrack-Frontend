import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { ProgressChart } from "react-native-chart-kit";
import ChatbotButton from "../../components/Shared/ChatbotButton";

const { width } = Dimensions.get("screen");

const BudgetScreen = ({ navigation }) => {
  const data = {
    labels: ["Energy", "Transport", "Food"],
    data: [0.6, 0.5, 0.4],
    colors: ["rgba(70, 166, 103, 1)", "rgba(242, 166, 73, 1)", "#F2937E"],
  };

  const [budget, SetBudget] = useState(167);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 30,
        position: "relative",
      }}
    >
      <View
        style={{
          width: "95%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Entypo name="chevron-left" size={28} color="black" />
        <Text style={{ fontSize: 24, fontFamily: "PoppinsSemiBold" }}>
          February
        </Text>
        <Entypo name="chevron-right" size={28} color="black" />
      </View>
      <View
        style={{
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
          borderRadius: 12,
          paddingBottom: 16,
          borderWidth: 2,
          borderColor: "#46a667",
        }}
      >
        <ProgressChart
          data={data}
          width={width * 0.94}
          height={250}
          strokeWidth={15}
          hasLegend={true}
          withCustomBarColorFromData={true}
          radius={35}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            decimalPlaces: 2,
            useShadowColorFromDataset: false,
          }}
          style={{ paddingVertical: 8 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            marginTop: 12,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Budget for this month:
          </Text>
          <Text style={{ fontSize: 16, color: "#aaa", fontWeight: "bold" }}>
            {budget} kg
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: width * 0.95,
          display: "flex",
          flexDirection: "row",
          gap: 6,
          backgroundColor: "#46A667",
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 40,
          borderRadius: 12,
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Ionicons name="calculator" color="#FFF" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          Set monthly budget
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: width * 0.95,
          display: "flex",
          flexDirection: "row",
          gap: 6,
          backgroundColor: "#46A667",
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 20,
          borderRadius: 12,
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("UserDashboard")}
      >
        <Ionicons name="calculator" color="#FFF" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          View My Data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: width * 0.95,
          display: "flex",
          flexDirection: "row",
          gap: 6,
          backgroundColor: "#46A667",
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 20,
          borderRadius: 12,
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("RewardScreen")}
      >
        <Ionicons name="calculator" color="#FFF" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
          View My Rewards
        </Text>
      </TouchableOpacity>

      <ChatbotButton />
    </View>
  );
};

export default BudgetScreen;
