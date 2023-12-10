// components/LikeButton.js

import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LikeButton = ({ initialLikes, onPress }) => {
  const [likes, setLikes] = useState(initialLikes || 0);

  const handlePress = () => {
    setLikes(likes + 1);
    onPress && onPress(); 
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <AntDesign name="heart" size={30} color="#FD2E2A" />
        <Text style={styles.likeCount}>{likes}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 5,
  },
});

export default LikeButton;
