import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import bot from "../../.././assets/bot.png";
import send from "../../.././assets/send.png";
import Message from "../../components/Chats/Message";

const data = [
  {
    id: 1,
    content: "Hello, how can I help you? If you need any help then let me know",
    sender: "bot",
  },
  {
    id: 2,
    content:
      "I have a question about your service. Can I ask you a few questions",
    sender: "user",
  },
  {
    id: 3,
    content: "Hey are you availabe for the chat?",
    sender: "user",
  },
  {
    id: 4,
    content: "Yes please ask the questions please",
    sender: "bot",
  },
  {
    id: 5,
    content: "I have cheeeest problem how I am polluting enviroment",
    sender: "user",
  },
  {
    id: 6,
    content: "this is a big problem bro!!",
    sender: "bot",
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    console.log("send message: ", message);
  };

  useEffect(() => {
    setMessages(data);
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Image style={styles.botPicture} source={bot} alt="bot" />
        </View>

        {/* Render all Messages */}
        <ScrollView style={styles.messageContainer}>
          {messages.map((item, index) => (
            <Message item={item} key={index} />
          ))}
        </ScrollView>

        {/* Send Message Container */}
        <View style={styles.inputContainer}>
          <TextInput
            //   style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Image source={send} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  picContainer: {
    marginTop: 70,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 2,
  },
  botPicture: {
    width: 150,
    height: 150,
  },

  sendIcon: {
    width: 20,
    height: 20,
  },

  messageContainer: {
    display: "flex",
    flexDirection: "column",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ChatScreen;
