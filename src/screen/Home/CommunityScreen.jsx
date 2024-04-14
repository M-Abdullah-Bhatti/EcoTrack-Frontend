import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons, Feather } from "@expo/vector-icons";
import SinglePost from "./SinglePost";
import ChatbotButton from "../../components/Shared/ChatbotButton";
import axios from "axios";
import StoryComponent from "../../components/StoryComponent";

// https://www.pinterest.com/pin/254664553914369768/

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        setIsLoading(true);
        try {
          const postData = await axios.get(
            "https://ecotrack-dev.vercel.app/api/posts/"
          );
          setPosts(postData.data);
          setIsLoading(false);
          console.log("POSTS: ", postData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
          borderBottomColor: "black",
          borderBottomWidth: 0.5,
          paddingLeft: 20,
        }}
      >
        <Image
          source={require("../../../assets/mainLogo.png")}
          style={{
            width: 25,
            height: 25,
            // borderRadius: 20,
            objectFit: "fill",
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "800" }}>
          Eco Track Community
        </Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: "64%",
            display: "flex",
            flexDirection: "row",
            height: 60,
            justifyContent: "space-around",
            alignItems: "center",
          }}
          onPress={() => Alert.alert("Aziz")}
        >
          <View style={{ width: 40, height: 40, borderRadius: 20 }}>
            <Image
              source={require("../../../assets/prof.png")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View
            style={{ display: "flex", alignItems: "flex-start", width: "70%" }}
          >
            <Text
              style={{
                fontSize: 13,
                marginTop: 2,
                fontWeight: "bold",
                color: "black",
                textTransform: "capitalize",
              }}
            >
              {user.name}
            </Text>
            <Text style={{ fontSize: 11, marginTop: 2, color: "black" }}>
              @{user.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 13,
          }}
        >
          <TouchableOpacity
            style={{
              height: 28,
              width: 28,
              backgroundColor: "white",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => console.log("hello")}
          >
            <Ionicons name="settings-sharp" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 28,
              width: 28,
              backgroundColor: "white",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <StoryComponent />

        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "black",
            borderWidth: 1,
            width: "90%",
            // marginHorizontal: "auto",
            padding: 5,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("Upload", { type: "post" })}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/mainLogo.png")}
              style={{
                width: 25,
                height: 25,
                objectFit: "fill",
              }}
            />
          </View>

          <View style={{ width: "80%" }}>
            <Text style={{ opacity: 0.6 }}>What's On Your Mind</Text>
          </View>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={{ marginTop: 50 }}
          />
        ) : !posts || posts.length === 0 ? (
          <View>
            <Text>No posts found</Text>
          </View>
        ) : (
          <View style={styles.postsContainer}>
            {posts.map((post, id) => (
              <SinglePost post={post} id={id} key={id} />
            ))}
          </View>
        )}
      </ScrollView>

      <ChatbotButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    // marginTop: StatusBar.currentHeight + 60,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: 0.5,
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default CommunityScreen;
