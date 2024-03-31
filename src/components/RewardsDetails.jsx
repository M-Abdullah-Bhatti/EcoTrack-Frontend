import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  return (
    <View>
      {rewardData.map((reward, i) => (
        <View
          style={{
            width: "98%",
            marginHorizontal: "1%",
            backgroundColor: "white",
            marginVertical: 1,
            paddingBottom: 10,
          }}
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
      ))}
    </View>
  );
};

export default RewardsDetails;
