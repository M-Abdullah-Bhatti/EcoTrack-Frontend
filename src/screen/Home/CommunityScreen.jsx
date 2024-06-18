import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SinglePost from "../../components/SinglePost";
import ChatbotButton from "../../components/Shared/ChatbotButton";
import axios from "axios";
import StoryComponent from "../../components/StoryComponent";

// https://www.pinterest.com/pin/254664553914369768/

const CommunityScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <StatusBar backgroundColor="#f1f1f1" />
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
            objectFit: "fill",
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "800" }}>
          Eco Track Community
        </Text>
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
            marginTop: 10,
            marginBottom: 16,
            borderColor: "black",
            borderWidth: 1,
            width: "90%",
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
              <SinglePost post={post} id={id} key={id} setPosts={setPosts} />
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
    backgroundColor: "#f1f1f1",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-around",
    backgroundColor: "#f1f1f1",
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
