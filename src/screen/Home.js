import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import UpdatePost from "./updatepost";
import { useNavigation } from "@react-navigation/native";
import Header from "./components/header";
import Footer from "./components/footer";
import LikeButton from "./components/likeButton";
import CommentButton from "./components/commentButton";
import CreatePost from "./components/createPost";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  const [isUpdatePostModalVisible, setUpdatePostModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleUpdatePost = (postId) => {
    setSelectedPostId(postId);
    setUpdatePostModalVisible(true);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://bloggler-backend.vercel.app/api/post"
        );
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const [isCreatePostModalVisible, setCreatePostModalVisible] = useState(false);
  const handleLikePost = async (postId) => {
    try {
      const headers = {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0YjdhNDFkNDRlMjg5MzRlZGNiMWMiLCJ1c2VyTmFtZSI6IkdhdXJhdiIsImVtYWlsIjoiR2F1cmF2LmNvbSIsImlhdCI6MTcwMjE5NDI2OCwiZXhwIjoxNzA0Nzg2MjY4fQ.QvWg84beS0YevdUWstUoPt979TGRfxpRGCdyeeVABCc"}`,
      };

      const response = await fetch(
        `https://bloggler-backend.vercel.app/api/post/like/${postId}`,
        {
          method: "POST",
          headers: headers,
        }
      );

      if (response.ok) {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        );

        setPosts(updatedPosts);
      } else {
        alert("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("An error occurred while liking the post");
    }
  };

  const handleCreatePost = () => {
    setCreatePostModalVisible(true);
  };
  const handleDeletePost = async (postId) => {
    try {
      const headers = {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0YjdhNDFkNDRlMjg5MzRlZGNiMWMiLCJ1c2VyTmFtZSI6IkdhdXJhdiIsImVtYWlsIjoiR2F1cmF2LmNvbSIsImlhdCI6MTcwMjE5NDI2OCwiZXhwIjoxNzA0Nzg2MjY4fQ.QvWg84beS0YevdUWstUoPt979TGRfxpRGCdyeeVABCc"}`,
      };

      const response = await fetch(
        `https://bloggler-backend.vercel.app/api/post/delete/${postId}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (response.ok) {
        alert("Post deleted successfully");

        const updatedResponse = await fetch(
          "https://bloggler-backend.vercel.app/api/post"
        );
        const updatedData = await updatedResponse.json();
        setPosts(updatedData.data);
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post");
    }
  };
  const handleUserIconPress = (userId) => {
    navigation.navigate("UserProfile", { userId });
  };

  return (
    <LinearGradient colors={["#fedae1", "#FD2E2A"]} style={styles.container}>
      <Header
        title="𝔸𝕃𝕃 ℙ𝕆𝕊𝕋𝕊"
        bgColor="#fedae1"
        textColor="#FD2E2A"
        align="center"
        justify="space-between"
        size={30}
        userImage="https://blog-user-profile.s3.amazonaws.com/cf56d85c-2192-48f9-82aa-737c15f81d5e-minionsIcon.png"
        onUserIconPress={() => navigation.navigate("UserProfile")}
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {posts.map((post) => (
          <View key={post._id} style={styles.card}>
            <View style={styles.userDetails}>
              <TouchableOpacity
                onPress={() => handleUserIconPress(post.createdBy._id)}
              >
                {post.createdBy.imageUrl ? (
                  <Image
                    source={{ uri: post.createdBy.imageUrl }}
                    style={styles.circularUserImage}
                  />
                ) : (
                  <Ionicons
                    name="person"
                    size={35}
                    color="#FD2E2A"
                    style={{
                      marginLeft: 10,
                      marginTop: 28,
                      backgroundColor: "#fedae1",
                    }}
                  />
                )}
              </TouchableOpacity>

              <View style={styles.userInfo}>
                <Text style={styles.createdByText}>
                  @{post.createdBy.userName}
                </Text>
                <Text style={styles.posttitle}>{post.title}</Text>
                <Text
                  style={styles.contentText}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {post.content}
                </Text>
                <Text style={{ color: "black", textAlign: "right", top: 8 }}>
                  {post.createdAt}
                </Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.buttons}>
              <LikeButton
                initialLikes={post.likes}
                onPress={() => handleLikePost(post._id)}
              />
              <CommentButton />
              <MaterialIcons
                name="delete"
                size={30}
                color="#FD2E2A"
                onPress={() => handleDeletePost(post._id)}
              />
              <FontAwesome
                name="pencil"
                size={28}
                color="#FD2E2A"
                style={styles.updateButton}
                onPress={() => handleUpdatePost(post._id)}
              />
            </View>
          </View>
        ))}

        
        
        
        <CreatePost
          modalVisible={isCreatePostModalVisible}
          setModalVisible={setCreatePostModalVisible}
          navigation={navigation}
        />
        <UpdatePost
          modalVisible={isUpdatePostModalVisible}
          setModalVisible={setUpdatePostModalVisible}
          postId={selectedPostId}
          navigation={navigation}
        />
      </ScrollView>
      <Footer />
      <Pressable style={styles.addButton} onPress={handleCreatePost}>
          <AntDesign
            name="plus"
            size={30}
            color="#FD2E2A"
            
          />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "30%",
    marginBottom: 100,
    top: 80,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    marginBottom: 10,
    flexDirection: "column",
    shadowColor: "#000",
    position: "relative",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 15,
    padding: 20,
    alignSelf: "center",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  posttitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
  contentText: {
    textAlign: "center",
  },
  createdByText: {
    color: "#FD2E2A",
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomColor: "#bdc3c7",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "#fedae1",
    marginBottom: 15,
    borderRadius: 50,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 25,
    zIndex: 2,
  },
  
  circularUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Home;
