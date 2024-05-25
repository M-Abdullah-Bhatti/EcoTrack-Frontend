import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const RewardsDetails = () => {
  const rewardData = [
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "January",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
    {
      month: "February",
      winnings: [
        {
          rewardType: "Comment",
          winningPrice: 8.1,
        },
        {
          rewardType: "Like",
          winningPrice: 10,
        },
        {
          rewardType: "Comment",
          winningPrice: 1,
        },
      ],
    },
  ];
  // const rewardData = [];
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 550 }}>
      {rewardData.length > 0 ? (
        rewardData.map((reward, i) => (
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
                fontWeight: "400",
                marginVertical: 16,
              }}
            >
              {reward.month}
            </Text>
            {reward.winnings.map((winning, i) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "800" }}>
                  {winning.rewardType}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {winning.winningPrice}
                  </Text>
                  <MaterialCommunityIcons
                    name="gold"
                    size={16}
                    style={{ marginLeft: 6 }}
                    color="#f2ac13"
                  />
                </View>
              </View>
            ))}
          </View>
        ))
      ) : (
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            // flex: 1,
            // justifyContent: "center",
            gap: 20,
            backgroundColor: "white",
            height: "100%",
            paddingTop: 80,
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
