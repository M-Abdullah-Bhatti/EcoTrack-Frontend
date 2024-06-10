import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const GuideItem = ({ data }) => {
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
