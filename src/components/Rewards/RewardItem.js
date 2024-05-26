import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mapping = {
  "post": "Added a Post",
  "comment": "Added a Comment"
}

const RewardItem = ({ reward }) => (
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
      <Text style={{ fontSize: 15, fontWeight: "400" }}>{mapping[reward.action]}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "400" }}>{reward.coinsEarned}</Text>
        <MaterialCommunityIcons name="gold" size={16} style={{ marginLeft: 6 }} color="#f2ac13" />
      </View>
    </View>
);

export default RewardItem;