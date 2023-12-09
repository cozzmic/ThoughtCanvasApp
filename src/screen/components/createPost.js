import React, { useState } from 'react';
import { View, Modal, TextInput, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
const CreatePost = ({ modalVisible, setModalVisible, navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTextInput = () => {
    if (!title.trim()) {
      alert('Unfilled Details');
      return false;
    }
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
        title: title,
        content: content,
  
      };
  
      
      const headers = {
        Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0YjdhNDFkNDRlMjg5MzRlZGNiMWMiLCJ1c2VyTmFtZSI6IkdhdXJhdiIsImVtYWlsIjoiR2F1cmF2LmNvbSIsImlhdCI6MTcwMjE0ODA4NiwiZXhwIjoxNzA0NzQwMDg2fQ.LZr7Rik133Ault3B9X3mhGHcIWo5_uxuIowC-Zhf2Yo`}`,
      };
  
      alert('Post Created Successfully');
      navigation.navigate('Home');
  
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/post",
        body,
        { headers: headers }
      );
  
      console.log("Post Created Successfully:", response.data);
      setTitle('');
    setContent('');

    navigation.navigate('Home');
  
     
    } catch (error) {
      console.log("Error during create post:", error);
  
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
            <Text style={styles.modalText}>Create Post</Text>
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
            <Pressable style={styles.shareBtn} onPress={handlePress}>
              <Text style={styles.textStyle}>Share</Text>
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
    height: 490,
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
  title: {
    height: 50,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    backgroundColor: '#fff',
  },
  content: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    width: 270,
    height: 200,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    textAlign: 'left',
  },
};

export default CreatePost;