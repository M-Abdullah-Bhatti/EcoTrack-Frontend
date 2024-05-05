import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import bot from "../../.././assets/bot.png";
import send from "../../.././assets/send.png";
import Message from "../../components/Chats/Message";
import axios from "axios";
import ThreeDotLoader from "../../components/ThreeDotLoader";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const { user } = useSelector((state) => state.user);

  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (!message) {
      return;
    }
    if (message.trim()) {
      // Ensure we don't send empty messages
      const newMessage = [...messages, { question: message, answer: "" }]; // Assume an empty answer initially
      setMessages(newMessage);
      setMessage("");

      setLoader(true); // Set loader to true before the request
      // hit the api here
      const body = JSON.stringify({
        user_id: user?._id,
        question: message,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://ecotrack.pythonanywhere.com/app/bot/", body, config)
        .then((res) => {
          console.log("response: ", res);
          const updatedMessages = [...newMessage];
          updatedMessages[updatedMessages.length - 1].answer =
            res?.data?.answer;
          setMessages(updatedMessages);
        })
        .catch((err) => console.log("err: ", err))
        .finally(() => setLoader(false)); // Use finally to set loader to false after the request completes
    }
  };

  useEffect(() => {
    setLoading(true);

    const body = JSON.stringify({
      user_id: user?._id,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://ecotrack.pythonanywhere.com/app/chat-history/",
        body,
        config
      )
      .then((res) => console.log("res: ", setMessages(res?.data?.chat_history)))
      .catch((err) => console.log("err: ", err));
    setLoading(false);
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <>
      <View style={styles.container}>
        {/* Render all Messages */}
        <ScrollView style={styles.messageContainer} ref={scrollViewRef}>
          <View style={styles.picContainer}>
            <Image style={styles.botPicture} source={bot} alt="bot" />
          </View>
          {loading ? (
            <View style={{ marginTop: 30 }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            // <Text>Loading</Text>
            <>
              {messages.map((item, index) => (
                <Message item={item} key={index} />
              ))}
              {loader && <ThreeDotLoader />}
            </>
          )}
        </ScrollView>

        {/* Send Message Container */}
        <View style={styles.inputContainer}>
          <TextInput
            //   style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message here..."
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loader ? true : false}
            style={styles.sendButton}
          >
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
