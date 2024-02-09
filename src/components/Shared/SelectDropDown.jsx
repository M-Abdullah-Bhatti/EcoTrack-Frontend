import React from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const SelectDropDown = ({ data, onSelect, defaultButtonText }) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText={defaultButtonText || "Select an option"}
      buttonStyle={styles.dropdownButtonStyle}
      dropdownStyle={styles.dropdownStyle}
      rowStyle={styles.dropdownRowStyle}
      rowTextStyle={styles.dropdownRowTextStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%", // Full width
    height: 50, // Adjust as needed
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdownStyle: {
    backgroundColor: "#FFF",
    borderRadius: 8, // Optional: if you want rounded corners
  },
  dropdownRowStyle: {
    backgroundColor: "#FFF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTextStyle: {
    fontSize: 16, // Adjust text size as needed
    color: "#444",
  },
});

export default SelectDropDown;
