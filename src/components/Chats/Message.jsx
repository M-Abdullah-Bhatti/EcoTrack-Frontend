import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Message = ({ item }) => {
  return (
    <>
      {/* question */}
      <View
        style={[
          // styles.messageBubble,
          item.question ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.question ? styles.userMessageText : styles.botMessageText,
          ]}
        >
          {item?.question}
        </Text>
      </View>

      {/* answer */}
      {item?.answer && (
        <View
          style={[
            // styles.messageBubble,
            item.answer ? styles.botMessage : styles.userMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.answer ? styles.botMessageText : styles.userMessageText,
            ]}
          >
            {item?.answer}
          </Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  botMessage: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginVertical: 7,
    maxWidth: "85%",
    backgroundColor: "#F4F1F1",
    alignSelf: "flex-start",
  },
  userMessage: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginVertical: 7,
    maxWidth: "85%",
    backgroundColor: "#2DBAA0",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  messageText: {
    // color: "#FFFFFF",
    fontSize: 14,
  },
  botMessageText: {
    color: "#000",
  },
  userMessageText: {
    color: "#FFFFFF",
  },
});
export default Message;
