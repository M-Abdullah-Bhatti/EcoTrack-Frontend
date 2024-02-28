import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  ScrollView
} from "react-native";

import { Ionicons, Entypo } from "@expo/vector-icons";
import { formatDateLikeFacebook } from "../../utils/helpers";

import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const SinglePost = ({ post, id }) => {
  const [viewFullDesc, setViewFullDesc] = useState(false);
  const [hasLoggedInUserLike, sethasLoggedInUserLike] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes);
  const inputCommentRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  // Initialize showFullComment state
  const [showFullComment, setShowFullComment] = useState(
    new Array(post.comments.length).fill(false)
  );

  // Function to toggle the state of a specific comment
  const toggleComment = (id) => {
    const updatedShowFullComment = [...showFullComment];
    updatedShowFullComment[id] = !updatedShowFullComment[id];
    setShowFullComment(updatedShowFullComment);
  };

  
  const { user } = useSelector((state) => state.user);
  const liked = likes.includes(user._id);
  
  const addComment = async () => {

    if (!comment) return;
    
    try {
      const requestBody = {
        comment: comment,
      };

      const response = await fetch(
        `https://ecotrack-dev.vercel.app/api/posts/${post._id}/activity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment. Please try again later.");
      }

      const responseData = await response.json();
      setComments(responseData.comments)
      console.log("Comment added successfully!", responseData);
      setComment("")
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const likePost = async () => {

    if (liked) return;
    
    try {
      const requestBody = {
        "like": false,
      };

      const response = await fetch(
        `https://ecotrack-dev.vercel.app/api/posts/${post._id}/activity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like post. Please try again later.");
      }

      const responseData = await response.json();
      setLikes(responseData.likes)
      console.log("Post Liked successfully!", responseData);
      setComment("")
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };

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
              source={require("../../../assets/rizwan.jpg")}
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
              {post.userId.name}
            </Text>
            <Text style={{ fontSize: 11, marginTop: 2 }}>
              {formatDateLikeFacebook(post.createdAt)}
            </Text>
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
              {post.postDescription}
              {/* <Text
                style={{ fontSize: 14 }}
                onPress={() => setViewFullDesc(true)}
              >
                See More
              </Text> */}
            </Text>
          ))}
      </View>

      {post.images.length > 0 && (
        <Image
          source={{ uri: post.images[0] }}
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
        {post.likeCount > 0 && (
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
              name={post.likeCount > 0 ? "like1" : "like2"}
              size={16}
              color="black"
            />

            <Text style={{ marginLeft: 4 }}>
              {likes.length > 0 &&
              likes.length + " Likes"
              }
            </Text>

            {/* <Text style={{ marginLeft: 4 }}>
              {post.likesByUsers.length > 0 &&
                post.likesByUsers[0].username.split(" ")[0]}{" "}
              and {post.likesByUsers.length > 0 && post.likesByUsers.length - 1}{" "}
              others
            </Text> */}
          </View>
        )}
        {comments > 0 && (
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

            <Text style={{ marginLeft: 4 }}>{post.commentCount} comments</Text>
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
          onPress={likePost}
        >
          <AntDesign
            name={liked ? "like1" : "like2"}
            size={18}
            color="white"
          />

          {!liked && <Text style={{ color: "white" }}>Like</Text>}
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
          setModalVisible(!modalVisible);
        }}
        on
        presentationStyle="fullScreen"
        style={{ position: "relative" }}
        onShow={() => inputCommentRef.current.focus()}
      >
        <View style={styles.modalHeader}>
          {post.likeCount > 0 && (
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
                name={post.likeCount > 0 ? "like1" : "like2"}
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
                {/* <Text
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
                </Text> */}
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
            onPress={() => {
              setModalVisible(false);
              setShowFullComment(new Array(comments.length).fill(false));
            }}
          >
            <Entypo name="circle-with-cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
            gap: 10,
            display: "flex",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {comments.map((comment, id) => (
            <View
              key={id}
              style={{
                width: "96%",
                height: showFullComment ? "auto" : 60,
                paddingVertical: 10,
                backgroundColor: "#f7f7f7",
                marginBottom: 10,
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
                borderRadius: 10,
                paddingHorizontal: 6,
              }}
            >
              <View style={{ width: 30, height: 30, borderRadius: 15 }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 100,
                  }}
                  source={require('../../../assets/placeholder.jpg')}
                />
              </View>
              <View
                style={{
                  width: "90%",
                  paddingHorizontal: 15,
                  height: showFullComment[id] ? "auto" : 40,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {comment.username || 'Rizwan Ahmed'}
                </Text>
                {showFullComment[id] ? (
                  <Text
                    onPress={() => toggleComment(id)}
                    style={{ fontSize: 12, height: "auto" }}
                  >
                    {comment.comment}
                  </Text>
                ) : (
                  <Text
                    onPress={() => toggleComment(id)}
                    style={{ fontSize: 10 }}
                  >
                    {comment.comment.length > 80
                      ? comment.comment.substr(0, 80)
                      : comment.comment}
                    {comment.comment.length > 80 && (
                      <Text style={{ fontSize: 12 }}>...see more</Text>
                    )}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.commentBox}>
          <TextInput
            placeholder="Add a comment..."
            style={{ fontSize: 16, margin: 12, height: "auto", width: "80%" }}
            multiline
            ref={inputCommentRef}
            onChangeText={(e)=> setComment(e)}
          />
          <TouchableOpacity onPress={addComment}>
            <AntDesign
              name="caretright"
              size={24}
              color="black"
              style={{ marginRight: 30 }}
            />
          </TouchableOpacity>
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
    borderRadius: 10,
    marginBottom: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});
export default SinglePost;
