import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./components/header";
import Footer from "./components/footer";
import LikeButton from "./components/likeButton";
import CommentButton from "./components/commentButton";
import CreatePost from "./components/createPost"; 
import UserIcon from "./components/userIcon";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
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

  const handleCreatePost = () => {
    setCreatePostModalVisible(true);
  };
  const handleDeletePost = async (postId) => {
    try {
      const headers = {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0YjdhNDFkNDRlMjg5MzRlZGNiMWMiLCJ1c2VyTmFtZSI6IkdhdXJhdiIsImVtYWlsIjoiR2F1cmF2LmNvbSIsImlhdCI6MTcwMjE0ODA4NiwiZXhwIjoxNzA0NzQwMDg2fQ.LZr7Rik133Ault3B9X3mhGHcIWo5_uxuIowC-Zhf2Yo'}`, 
      };

      const response = await fetch(
        `https://bloggler-backend.vercel.app/api/post/delete/${postId}`,
        {
          method: 'DELETE',
          headers: headers,
        }
      );

      if (response.ok) {
        alert('Post deleted successfully');

        const updatedResponse = await fetch(
          'https://bloggler-backend.vercel.app/api/post'
        );
        const updatedData = await updatedResponse.json();
        setPosts(updatedData.data);
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
    }
  };

  return (
    <LinearGradient colors={["#fedae1", "#FD2E2A"]} style={styles.container}>
      <Header
        title="𝔸𝕃𝕃 ℙ𝕆𝕊𝕋𝕊"
        bgColor="#fedae1"
        textColor="#FD2E2A"
        align="center"
        justify="flex-start"
        size={30}
      
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {posts.map((post) => (
          <View key={post._id} style={styles.card}>
            <View style={styles.userDetails}>
              <UserIcon icon={post.createdBy.imageUrl} />
              <View style={styles.userInfo}>
                <Text style={styles.createdByText}>
                  @{post.createdBy.userName}
                </Text>
                <Text style={styles.posttitle}>{post.title}</Text>
                <Text style={styles.contentText} 
                      numberOfLines={3}
                      ellipsizeMode="tail"
                >{post.content}</Text>
                <Text style={{ color: "black", textAlign: "right", top: 8 }}>
                  {post.createdAt}
                </Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.buttons}>
              <LikeButton />
              <CommentButton />
              <MaterialIcons name="delete" size={35} color="#FD2E2A"  onPress={() => handleDeletePost(post._id)}/>
            </View>
          </View>
        ))}

        <Footer />
        <Pressable
          style={styles.addButton}
          onPress={handleCreatePost}
        >
          <AntDesign
            name="plus"
            size={30}
            color="#FD2E2A"
            style={styles.plusIcon}
          />
        </Pressable>
        <CreatePost
          modalVisible={isCreatePostModalVisible}
          setModalVisible={setCreatePostModalVisible} 
          navigation={navigation}
        />
      </ScrollView>
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
    paddingBottom: "34%",
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
    marginLeft: 10, // Add some margin between the user icon and text
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
    // marginBottom: 10,
  },
  createdByText: {
    color: "#FD2E2A",
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    marginBottom: 10, // Add space between user icon and text
  },
  horizontalLine: {
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    width: '100%', // Adjust the width as needed
    marginVertical: 5,
    // margin // Adjust the vertical spacing as needed
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10, // Add space between content and buttons
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#fedae1",
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
  plusIcon: {
    fontWeight: 900,
  },
  ////////////////Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FD2E2A",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 490,
  },
  shareBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
    width: 120,
    border: "none",
  },
  textStyle: {
    color: "#FD2E2A",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    top: 0,
  },
  title: {
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    backgroundColor: "#fff",
  },
  content: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    height: 200,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    textAlign: "left",
  },
});




export default Home;
