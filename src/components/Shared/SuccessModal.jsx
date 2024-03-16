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

const SuccessModal = ({ isVisible, hideModal, modalText, buttonText }) => {
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
          backgroundColor: "white",
          paddingVertical: 30,
          paddingHorizontal: 20,
          alignItems: "center",
          display: "flex",
          gap: 10,
        }}
      >
        <AntDesign
          name="checkcircle"
          size={100}
          color="#46A667"
          style={{ marginBottom: 10 }}
        />
        {/* <MaterialIcons name="error" size={100} color="#d1180a" /> */}
        {/* {success && (
          <AntDesign
            name="checkcircle"
            size={24}
            color="#46A667"
            style={{ marginBottom: 10 }}
          />
        )} */}

        <Text
          style={{
            color: "#000",

            fontSize: 14,
            // letterSpacing: 0.24,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {modalText}
        </Text>
        <ButtonComponent
          spacing={{
            borderRadius: 20,
          }}
          buttonText={buttonText}
          onPress={hideModal}
          backgroundColor={"#000"}
        />
      </View>
    </Modal>
  );
};

export default SuccessModal;
