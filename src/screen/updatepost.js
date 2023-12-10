// UpdatePost.js

import React, { useState } from 'react';
import { View, Modal, TextInput, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const UpdatePost = ({ modalVisible, setModalVisible, postId, navigation }) => {
  const [content, setContent] = useState('');

  const handleTextInput = () => {
    if (!content.trim()) {
      alert('Unfilled Details');
      return false;
    }
    return true;
  };

  const handlePress = async () => {
    try {
      if (!handleTextInput()) {
        return;
      }

      const body = {
        content: content,
      };

      const headers = {
        Authorization: `Bearer ${'YOUR_ACCESS_TOKEN'}`,
      };

      alert('Post Updated Successfully');
      navigation.navigate('Home');

      const response = await axios.patch(
        `https://bloggler-backend.vercel.app/api/post/update/${postId}`,
        body,
        { headers: headers }
      );

      console.log("Post Updated Successfully:", response.data);
      setContent('');
    } catch (error) {
      console.log("Error during update post:", error);

      const errorMessage = error?.response?.data?.message || 'An error occurred';

      console.log("Error message:", errorMessage);
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="closecircleo" size={25} color="#fff" />
            </Pressable>
            <Text style={styles.modalText}>Update Post</Text>
            <TextInput
              style={styles.content}
              placeholder="Update Your Thoughts"
              value={content}
              onChangeText={(text) => setContent(text)}
              multiline
            />
            <Pressable style={styles.shareBtn} onPress={handlePress}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FD2E2A',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 300,
  },
  shareBtn: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
    width: 120,
    border: "none",
    marginTop: 20,
  },
  textStyle: {
    color: '#FD2E2A',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    top: 0,
  },
  content: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    height: 150,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    textAlign: 'left',
  },
};

export default UpdatePost;
