import React, { useRef, useState } from "react";
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

import { Ionicons, Entypo } from "@expo/vector-icons";

import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { pickFiles, pickImage, pickVideos } from "../../utils/pickImage";

const SinglePost = ({ post, id }) => {
  const [viewFullDesc, setViewFullDesc] = useState(false);
  const [hasLoggedInUserLike, sethasLoggedInUserLike] = useState(false);
  const inputCommentRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      key={id}
      style={{
        height: "auto",
        marginVertical: 20,
        width: "96%",

        shadowColor: "#000",
        backgroundColor: "white",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
      }}
    >
      <View style={styles.postheader}>
        <TouchableOpacity
          style={{
            width: "60%",
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
              source={post.userPic}
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
            <Text style={{ fontSize: 13, marginTop: 2, fontWeight: "bold" }}>
              {post.username}
            </Text>
            <Text style={{ fontSize: 11, marginTop: 2 }}>{post.timestamp}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 28,
            width: 28,
            backgroundColor: "#f0efed",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => alert("hello")}
        >
          <Ionicons name="settings-sharp" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        {post.description != "" &&
          (viewFullDesc ? (
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,

                paddingHorizontal: 10,
                marginBottom: 10,
              }}
              onPress={() => setViewFullDesc(false)}
            >
              {post.description}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                lineHeight: 18,
                marginBottom: 10,

                paddingHorizontal: 10,
              }}
            >
              {post.description.substring(0, 60)}...{" "}
              <Text
                style={{ fontSize: 14 }}
                onPress={() => setViewFullDesc(true)}
              >
                See More
              </Text>
            </Text>
          ))}
      </View>

      {post.mediaUploaded.length > 0 && (
        <Image
          source={post.mediaUploaded[0]}
          style={{ height: 250, width: "94%", marginHorizontal: 10 }}
        />
      )}
      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          flexDirection: "row",
          gap: 20,
        }}
        onPress={() => setModalVisible(true)}
      >
        {post.totalLikes > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 10,
              marginVertical: 10,
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <AntDesign
              name={post.totalLikes > 0 ? "like1" : "like2"}
              size={16}
              color="black"
            />

            <Text style={{ marginLeft: 4 }}>
              {post.likesByUsers.length > 0 &&
                post.likesByUsers[0].username.split(" ")[0]}{" "}
              and {post.likesByUsers.length > 0 && post.likesByUsers.length - 1}{" "}
              others
            </Text>
          </View>
        )}
        {post.totalComments > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 10,
              marginVertical: 10,
              alignSelf: "flex-end",
              alignItems: "center",

              width: "38%",
            }}
          >
            <FontAwesome5 name="comment-dots" size={16} color="black" />

            <Text style={{ marginLeft: 4 }}>{post.totalComments} comments</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.postMEdiaBtns}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            gap: 8,
            backgroundColor: "#2DBAA0",

            padding: 10,
            borderRadius: 12,
          }}
          onPress={() => sethasLoggedInUserLike(!hasLoggedInUserLike)}
        >
          <AntDesign
            name={hasLoggedInUserLike ? "like1" : "like2"}
            size={18}
            color="white"
          />

          <Text style={{ color: "white" }}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            gap: 8,
            backgroundColor: "#2DBAA0",
            // borderColor: "black",
            // borderWidth: 0.5,
            borderRadius: 12,
          }}
          onPress={() => {
            setModalVisible(true);
            // inputCommentRef.current.focus();
          }}
        >
          <FontAwesome5 name="comment-dots" size={18} color="white" />
          <Text style={{ color: "white" }}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            gap: 8,
            backgroundColor: "#2DBAA0",
            // borderColor: "black",
            // borderWidth: 0.5,
            borderRadius: 12,
          }}
        >
          <FontAwesome name="share" size={18} color="white" />
          <Text style={{ color: "white" }}>Share</Text>
        </TouchableOpacity>
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
        onShow={() => inputCommentRef.current.focus()}
      >
        <View style={styles.modalHeader}>
          {post.totalLikes > 0 && (
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
              <AntDesign
                name={post.totalLikes > 0 ? "like1" : "like2"}
                size={16}
                color="black"
              />
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
                  {post.likesByUsers.length > 0 &&
                    post.likesByUsers[0].username.split(" ")[0]}{" "}
                  and{" "}
                  {post.likesByUsers.length > 0 && post.likesByUsers.length - 1}{" "}
                  others
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.commentBox}>
          <TextInput
            placeholder="Add a comment..."
            style={{ fontSize: 16, margin: 12, height: "auto", width: "80%" }}
            multiline
            ref={inputCommentRef}
          />
          <Entypo
            name="attachment"
            size={20}
            color="black"
            style={{ marginRight: 30 }}
            onPress={pickFiles}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
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
  postMEdiaBtns: {
    // position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // bottom: "50%",
    marginVertical: 10,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal: 4,
    justifyContent: "flex-end",
    // backgroundColor: "#2DBAA0",
    // borderBottomWidth: 0.3,
    marginTop: 10,
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
  commentBox: {
    position: "absolute",
    bottom: 0,
    borderColor: "grey",
    borderWidth: 0.4,
    width: "95%",
    marginHorizontal: 10,
    borderRadius: 50,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default SinglePost;
