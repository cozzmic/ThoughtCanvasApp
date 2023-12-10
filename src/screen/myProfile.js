import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import LikeButton from "./components/likeButton";
import CommentButton from "./components/commentButton";

const MyProfile = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    userName: "gaurav",
    imageUrl:
      "https://blog-user-profile.s3.amazonaws.com/cf56d85c-2192-48f9-82aa-737c15f81d5e-minionsIcon.png",
  });

  const userPosts = [
    {
      _id: "1",
      title: "My Title",
      content: "My Content",
      createdAt: "2023-01-01T12:00:00Z",
    },
    {
      _id: "2",
      title: "My Title",
      content: "My Content",
      createdAt: "2023-01-01T12:00:00Z",
    },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "You need to enable gallery access to change your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, imageUrl: result.uri });
    }
  };

  return (
    <LinearGradient colors={["#fedae1", "#FD2E2A"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#fff"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.userDetails}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: userData.imageUrl }}
              style={styles.userImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editProfileButton} onPress={pickImage}>
            <Text style={{ color: "#FD2E2A", fontWeight: "bold" , fontSize:10}}>Add/Update Image</Text>
          </TouchableOpacity>
          <Text style={styles.createdByText}>@{userData.userName}</Text>
        </View>

        {userPosts.map((post) => (
          <View key={post._id} style={styles.card}>
            <Text style={styles.posttitle}>{post.title}</Text>
            <Text style={styles.contentText}>{post.content}</Text>
            <Text style={{ color: "black", textAlign: "right", top: 8 }}>
              {post.createdAt}
            </Text>
            <View style={styles.horizontalLine} />
            <View style={styles.buttons}>
              <LikeButton />
              <CommentButton />
            </View>
          </View>
        ))}

        {/* Include your Footer component here */}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fedae1",
    borderBottomColor: "#FD2E2A",
    borderBottomWidth: 1,
  },
  backIcon: {
    marginRight: 10,
    marginTop: 24,
    fontWeight: '600',
    color: "#FD2E2A",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FD2E2A",
    marginTop: 20,
    marginLeft: 20,
  },
  scrollContentContainer: {
    flexGrow: 1,

    paddingBottom: "32%",
    marginBottom: 100,
  },
  userDetails: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  userImage: {
    width: 395,
    height: 395,
    marginBottom: 20,
  },
  editProfileButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    margin: 10,
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
    color: "#fff",
    fontSize: 20,
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
});

export default MyProfile;
