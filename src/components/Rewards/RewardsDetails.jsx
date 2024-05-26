import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { groupByDate } from "../../utils/helpers";
import RewardItem from "./RewardItem";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const RewardsDetails = () => {

  const [rewardsData, setRewardsData] = useState([]);
  const [groupedRewards, setGroupedRewards] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://ecotrack-dev.vercel.app/api/rewards/${user._id}`
          );
          const data = response.data;
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRewardsData(sortedData);
          setGroupedRewards(groupByDate(sortedData));
          setIsLoading(false);
          console.log("GROUPED REWARDSSSSSS: ", groupByDate(sortedData));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      getData();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 250 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      {Object.keys(groupedRewards).length > 0 ? (
        Object.keys(groupedRewards).map((date, i) => (
          <View
            style={{
              width: "98%",
              marginHorizontal: "1%",
              backgroundColor: "white",
              marginVertical: 1,
              paddingBottom: 10,
            }}
            key={i}
          >
            <Text
              style={{
                textAlign: "left",
                marginLeft: 10,
                fontSize: 14,
                fontWeight: "600",
                marginVertical: 16,
              }}
            >
              {date}
            </Text>
            {groupedRewards[date].map((reward, i) => (
              <RewardItem key={i} reward={reward} />
            ))}
          </View>
        ))
      ) : (
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 20,
            backgroundColor: "white",
            height: "100%",
            paddingTop: 80,
            flex: 1,
          }}
        >
          <Text>You have no rewards right now</Text>
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              height: 50,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "#a8a5a5",
                fontSize: 14,
                marginRight: 10,
              }}
            >
              Contribute to community to earn rewards
            </Text>
            <AntDesign name="arrowright" size={16} color="#a8a5a5" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default RewardsDetails;
