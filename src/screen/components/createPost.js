import React, { useState } from 'react';
import { View, Modal, TextInput, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CreatePost = ({ modalVisible, setModalVisible, onSubmit,navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePress = () => {
    onSubmit({ title, content });
    setTitle('');
    setContent('');
    setModalVisible(!modalVisible);
  };

  return (
    <View >
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign name="closecircleo" size={25} color="#fff" />
            </Pressable>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
            <Text style={styles.modalText}>Create Post</Text>
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
          <Pressable style={styles.shareBtn} onPress={handlePress}>
            <Text style={styles.textStyle}>Share</Text>
          </Pressable>
        </View>
      
    </Modal>
    </View>
  );
};

const styles = {
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10, 
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
    border: 'none',
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
