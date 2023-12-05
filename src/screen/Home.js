import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import Header from "./header";
import Footer from "./footer";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const CreatePost = async () => {
    try {
      const body = {
        title: title,
        content: content,
      };

      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/post",
        body,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTYxYjk1M2VlNThjNzIxMjlmMGExMTMiLCJ1c2VyTmFtZSI6ImciLCJlbWFpbCI6ImdhdXJhdjEyQC5jb20iLCJpYXQiOjE3MDE4MDA3OTMsImV4cCI6MTcwNDM5Mjc5M30.fnrjQNaEZY6zZz-VUuqSYtvAddTPqIzjc6B3YN1UzGo`,
          },
        }
      );

      console.log("Post created successfully:", response.data);

      const username = response.data.username;

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data, username)
      );
      alert("Post created successfully!");
      setTitle("");
      setContent("");

      navigation.navigate("CreatePost");
    } catch (error) {
      console.log("Error during post:", error);

      const errorMessage = error?.response?.data?.message || "Unknown error";
      console.log("Error message:", errorMessage);

      alert("Error during post: ${errorMessage}. Please try again.");
    }
  };
  const onPress = async () => {
    if (!title || !content) {
      alert("Please fill in both title and content fields.");
      return;
    }

    try {
      const post = await CreatePost();
      // ... rest of the code
    } catch (error) {
      // ... error handling
    }
  };

  return (
    <LinearGradient colors={["#fedae1", "#FD2E2A"]} style={styles.container}>
      <Header
        title="𝔸𝕃𝕃 ℙ𝕆𝕊𝕋𝕊"
        bgColor="#fedae1"
        textColor="#FD2E2A"
        align="center"
        justify="center"
        size={30}
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {posts.map((post) => (
          <View key={post._id} style={styles.card}>
            <View style={styles.content}>
              <Text style={[styles.title, { fontSize: 18, color: "#2c3e50" }]}>
                {post.title}
              </Text>
              <Text style={{ fontSize: 16, color: "#34495e" }}>
                {post.content}
              </Text>
              <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
                Created by: {post.createdBy.userName}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{  width: 300}}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircleo" size={30} color="#fff" />
              </Pressable>
              <Text style={styles.modalText}>ℂ𝕣𝕖𝕒𝕥𝕖 ℙ𝕠𝕤𝕥</Text>
            </View>
            <TextInput
              style={styles.title}
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.content}
              placeholder="Your Thoughts"
              value={content}
              onChangeText={(text) => setContent(text)}
              multiline
            />
            <Pressable
              style={styles.shareBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Share</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Footer />
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <AntDesign
          name="plus"
          size={30}
          color="#FD2E2A"
          style={styles.plusIcon}
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
    paddingBottom: "34%",
    marginBottom: 100,
    top: 80,
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  // Customize your button styles as needed
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
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
    border: "none",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    backgroundColor: "#fff",
  },
  content: {
    height: 50,
    border: "none",
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
