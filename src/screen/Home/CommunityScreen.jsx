import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import SinglePost from "./SinglePost";
import { pickImage, pickVideos } from "../../utils/pickImage";

// https://www.pinterest.com/pin/254664553914369768/

const CommunityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const likes = 0;
  const [text, onChangeText] = React.useState("");
  function handleLogout() {
    dispatch(logout());
    navigation.replace("AuthNavigation");
  }

  const stories = [
    {
      user: "LoggedIn",
      icon: <AntDesign name="plus" size={18} color="white" />,
      story: require("../../../assets/t2.jpg"),
    },
    {
      user: "Rizwan",
      pic: require("../../../assets/rizwan.jpg"),
      story: require("../../../assets/t2.jpg"),
    },
    {
      user: "Murtaza",
      pic: require("../../../assets/murtaza.jpg"),
      story: require("../../../assets/texture.png"),
    },
    {
      user: "Abdullah",
      pic: require("../../../assets/abdullah.jpg"),
      story: require("../../../assets/texture.png"),
    },
    {
      user: "Shayan",
      pic: require("../../../assets/shayan.jpg"),
      story: require("../../../assets/texture.png"),
    },
  ];
  const posts = [
    {
      username: "Murtaza Khan",
      timestamp: "2 hours ago",
      description:
        "Hey Earth champions! 🌍✨ Let's talk carbon footprints today,those invisible but impactful steps we leave on our planetHey Earth champions! 🌍✨ Let's talk carbon footprints today—those invisible but impactful steps we leave on our planet",
      mediaUploaded: [
        require("../../../assets/t2.jpg"),
        require("../../../assets/t2.jpg"),
      ],
      totalLikes: 20,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../../assets/murtaza.jpg"),
      likesByUsers: [
        { username: "Abdullah Khan" },
        { username: "Rizwan Ahmed" },
        { username: "Raza Abbas" },
        { username: "Ali Haider" },
      ],
    },
    {
      username: "Rizwan Ahmed",
      timestamp: "5 min ago",
      description: "",
      mediaUploaded: [
        require("../../../assets/texture.png"),
        require("../../../assets/t2.jpg"),
      ],
      totalLikes: 11,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../../assets/rizwan.jpg"),
      likesByUsers: [
        { username: "Abdullah Khan" },
        { username: "Rizwan Ahmed" },
        { username: "Raza Abbas" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
        { username: "Ali Haider" },
      ],
    },
    {
      username: "Shayan Askari",
      timestamp: "1 hour ago",
      description: "",
      mediaUploaded: [
        require("../../../assets/texture.png"),
        require("../../../assets/t2.jpg"),
      ],
      totalLikes: 0,
      totalComments: 5,
      totalShares: 1,
      userPic: require("../../../assets/shayan.jpg"),
      likesByUsers: [],
    },
  ];
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: "64%",
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "row",
            height: 60,
            justifyContent: "space-around",
            alignItems: "center",
          }}
          onPress={() => alert("Aziz")}
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
              }}
            >
              Abdullah Azizzzzzzz
            </Text>
            <Text style={{ fontSize: 11, marginTop: 2, color: "black" }}>
              @A4Abdullah
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
            onPress={() => alert("hello")}
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
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        presentationStyle="fullScreen"
        style={{ position: "relative" }}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{
              width: "80%",
              // backgroundColor: "red",
              display: "flex",
              flexDirection: "row",
              height: 60,
              justifyContent: "flex-start",
              alignItems: "center",

              gap: 10,
            }}
            onPress={() => alert("Aziz")}
          >
            <View style={{ width: 40, height: 40, borderRadius: 20 }}>
              <Image
                source={require("../../../assets/prof.png")}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "70%",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 2,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Abdullah Azizzzzzzz
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Say Something..."
          style={{ fontSize: 24, margin: 12, height: 60 }}
          multiline
        />
        <View style={styles.modalMEdiaBtns}>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "46%",
              gap: 10,
              backgroundColor: "#f5f5f5",

              padding: 10,
              borderRadius: 12,
            }}
            onPress={pickImage}
          >
            <Entypo name="images" size={24} color="red" />

            <Text>Add Images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "46%",
              gap: 10,
              backgroundColor: "#f5f5f5",
              // borderColor: "black",
              // borderWidth: 0.5,
              borderRadius: 12,
            }}
            onPress={pickVideos}
          >
            <Entypo name="folder-video" size={24} color="blue" />
            <Text>Add Videos</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        style={styles.mainContainer}
      >
        <View style={styles.stories}>
          {/* <View style={styles.addStory}>
          <View style={{ width: "100%", height: "100%", borderRadius: 10 }}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={require("../../../assets/texture.png")}
            />
          </View>
        </View> */}
          <FlatList
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
            showsHorizontalScrollIndicator={false}
            style={{ height: 130, gap: 30 }}
            data={stories}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.singleStory}>
                <View
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={item.story}
                  />
                </View>
                {item.user != "LoggedIn" && (
                  <Text
                    style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}
                  >
                    {item.user}
                  </Text>
                )}

                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    height: 24,
                    width: 24,
                    bottom: -10,
                    borderRadius: 12,
                    alignSelf: "center",
                    marginTop: 40,
                    zIndex: 20,
                  }}
                >
                  {item.icon ? (
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 24,
                        width: 24,
                      }}
                    >
                      {item.icon}
                    </View>
                  ) : (
                    <Image
                      source={item.pic}
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                      }}
                    />
                  )}
                </View>
                {item.user != "LoggedIn" && (
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      borderRadius: 10,
                      zIndex: 2,
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
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
          onPress={() => setModalVisible(true)}
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
                // borderRadius: 20,
                objectFit: "fill",
              }}
            />
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ opacity: 0.6 }}>What's On Your Mind</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          {posts.map((post, id) => (
            <SinglePost post={post} id={id} key={id} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CommunityScreen;

{
  /* <TouchableOpacity
  style={{
    backgroundColor: "#46A667",
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  }}
  onPress={handleLogout}
>
  <Text style={{ color: "white" }}>Logout</Text>
</TouchableOpacity>; */
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : "0px",
    backgroundColor: "white",
    // position: "relative",
    // paddingBottom: 200,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    // backgroundColor: "",
    position: "fixed",
  },
  stories: {
    display: "flex",
    flexDirection: "row",
    // overflow: "scroll",
    justifyContent: "space-around",
    gap: 20,
    paddingHorizontal: 10,
    marginTop: 2,
    position: "relative",
  },

  addStory: {
    width: "20%",
    height: 100,
  },
  singleStory: {
    width: 70,
    height: 100,
    position: "relative",
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  postheader: {
    display: "flex",
    flexDirection: "row",
    // marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
    // position: "fixed",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalll: {
    width: 1000,
    height: 100,
  },

  modalHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal: 4,
    justifyContent: "space-around",
    // backgroundColor: "#2DBAA0",
    borderBottomWidth: 0.3,
  },
  modalMEdiaBtns: {
    // position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // bottom: "50%",
    marginTop: 50,
  },
});
