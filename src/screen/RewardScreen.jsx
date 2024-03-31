import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import RewardsDetails from "../components/RewardsDetails";
import RedemptionDetail from "../components/RedemptionDetail";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RewardScreen = () => {
  const [rewardDetailsVisible, setrewardDetailsVisible] = useState(true);
  //   const [redemptionDetailsVisible, setredemptionDetailsVisible] =
  //     useState(false);
  const [activeTab, setActiveTab] = useState("Rewards");
  return (
    <View>
      <View style={styles.rewardHeader}>
        <Image
          source={require("../../assets/rewardheaderimg-removebg-preview.png")}
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              fontWeight: "500",
              color: "white",
            }}
          >
            100
          </Text>
          <MaterialCommunityIcons
            name="gold"
            size={19}
            style={{ marginLeft: 6 }}
            color="#ffc53d"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.slideBtn,
            activeTab === "Rewards" && styles.activeButton,
          ]}
          onPress={() => {
            setrewardDetailsVisible(true);
            setActiveTab("Rewards");
          }}
        >
          <Text
            style={[
              activeTab === "Rewards" && styles.activeText,
              { fontWeight: "600", fontSize: 14 },
            ]}
          >
            Rewards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.slideBtn,
            activeTab === "Redemption" && styles.activeButton,
          ]}
          onPress={() => {
            setrewardDetailsVisible(false);
            setActiveTab("Redemption");
          }}
        >
          <Text
            style={[
              activeTab === "Redemption" && styles.activeText,
              { fontWeight: "600", fontSize: 14 },
            ]}
          >
            Redemption
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentForRewardScreenContainer}>
        {rewardDetailsVisible ? <RewardsDetails /> : <RedemptionDetail />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  slideBtn: {
    padding: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "slate",
    width: "50%",
    // textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  // rewardHeader: {
  //   height: 100,
  //   backgroundColor: "red",
  //   color: "white",
  // },
  rewardHeader: {
    // height: 100,
    backgroundColor: "#0c856e",
    color: "white",
    width: "100%",
    paddingVertical: 50,
    display: "flex",
    alignItems: "center",
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#2DBAA0", // Change this to your desired active color
  },
  activeText: {
    color: "#2DBAA0", // Change this to your desired active color
  },
});

export default RewardScreen;
