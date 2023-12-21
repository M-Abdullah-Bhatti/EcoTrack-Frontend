import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const CommunityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    navigation.replace("AuthNavigation");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontFamily: "PoppinsMedium" }}>
        Community Coming Soon...
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#46A667",
          marginTop: 18,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
          alignItems: "center",
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityScreen;
