import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import ButtonComponent from "./Shared/ButtonComponent";

const SetGoalModal = ({
  isVisible,
  hideModal,
  title,
  description,
  success,
  error,
}) => {
  const [selectedPercentage, setSelectedPercentage] = useState(null);

  const handleCheckboxPress = (percentage) => {
    setSelectedPercentage(percentage);
  };

  return (
    <Modal
      hasBackdrop={true}
      // onBackdropPress={hideModal}
      isVisible={isVisible}
      animationIn={"fadeInLeft"}
      animationOut={"fadeOutRight"}
      backdropColor="#c9c7c7"
    >
      <View
        style={{
          width: wp("89%"),
          minHeight: hp("40%"),
          borderRadius: wp("3%"),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingHorizontal: wp("5%"),
          paddingVertical: hp("1%"),
        }}
      >
        {error && <MaterialIcons name="error" size={24} color="#d1180a" />}
        {success && (
          <AntDesign
            name="checkcircle"
            size={24}
            color="#46A667"
            style={{ marginBottom: 10 }}
          />
        )}
        <Text
          style={{
            color: "#253551",
            fontSize: 16,
            fontWeight: "800",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#657389",
            fontSize: 14,
            letterSpacing: 0.24,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text style={{ color: "#253551", fontSize: 14, marginBottom: 10 }}>
            Select reduction percentage:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {[5, 10, 15].map((percentage) => (
              <TouchableOpacity
                key={percentage}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor:
                    selectedPercentage === percentage ? "black" : "white",
                  padding: 10,
                  borderRadius: 5,
                  width: wp("20%"),
                }}
                onPress={() => handleCheckboxPress(percentage)}
              >
                <Text
                  style={{
                    color:
                      selectedPercentage === percentage ? "white" : "black",
                  }}
                >
                  {percentage}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <ButtonComponent
          spacing={{
            borderRadius: 20,
          }}
          buttonText="Done"
          onPress={hideModal}
          backgroundColor={"black"}
        />
      </View>
    </Modal>
  );
};

export default SetGoalModal;
