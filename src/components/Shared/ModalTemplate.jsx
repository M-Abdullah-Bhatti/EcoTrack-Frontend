import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { AppColor } from "../../colors/AppColor";
import Modal from "react-native-modal";
// import CustomModalStyle from "../../style/CustomModalStyle";
import ButtonComponent from "./ButtonComponent";

const ModalTemplate = ({
  isVisible,
  hideModal,
  title,
  description,
  success,
  error,
}) => {
  return (
    <Modal
      hasBackdrop={true}
      onBackdropPress={hideModal}
      // style={CustomModalStyle.modalView}
      isVisible={isVisible}
      animationIn={"fadeInLeft"}
      animationOut={"fadeOutRight"}
      backdropColor="#c9c7c7"
    >
      <View
        style={{
          width: wp("75"),
          minHeight: hp("30"),
          borderRadius: wp("7"),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingHorizontal: 5,
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

            fontSize: 14,
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

            fontSize: 12,
            letterSpacing: 0.24,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
        <ButtonComponent
          spacing={{
            borderRadius: 20,
          }}
          buttonText="Got it!"
          onPress={hideModal}
          backgroundColor={success ? "#46A667" : error ? "#d1180a" : "black"}
        />
      </View>
    </Modal>
  );
};

export default ModalTemplate;
