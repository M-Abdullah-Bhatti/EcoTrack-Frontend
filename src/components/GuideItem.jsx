import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const GuideItem = ({ data }) => {
  const navigation = useNavigation();
  
  return (
    <>
      {data.map((content, index) => (
        <TouchableOpacity
          key={index}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
          onPress={() => navigation.navigate("ActDetails", { content })}
        >
          <Text style={{ color: "#000", fontSize: 15, fontFamily: "PoppinsLight" }}>
            {content.tip}
          </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default GuideItem;
