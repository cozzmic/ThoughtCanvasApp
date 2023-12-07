import React, { useState } from 'react';
import { View, Pressable, Modal, TextInput, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Buttons = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentPress = () => {
    setIsCommentModalVisible(true);
  };

  const handleCommentModalClose = () => {
    setIsCommentModalVisible(false);
  };

  const handleCommentSubmit = () => {
    // Add your logic to submit the comment
    console.log('Comment submitted:', commentText);
    setCommentText('');
    setIsCommentModalVisible(false);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <Pressable onPress={handleLikePress}>
          <AntDesign
            name={isLiked ? 'like1' : 'like2'}
            size={35}
            color={isLiked ? '#FD2E2A' : '#FD2E2A'}
          />
        </Pressable>
        <Pressable onPress={handleCommentPress}>
          <FontAwesome name="comment-o" size={35} color="#FD2E2A" />
        </Pressable>
      </View>
      {/* Comment Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={isCommentModalVisible}
  onRequestClose={handleCommentModalClose}
>
  <View style={styles.commentModalContainer}>
    <View style={styles.commentModalContent}>
      <TextInput
        style={styles.commentInput}
        placeholder="Enter your comment"
        onChangeText={(text) => setCommentText(text)}
        value={commentText}
      />
      <Pressable
        style={styles.submitButton}
        onPress={handleCommentSubmit}
      >
        <Text style={styles.buttonText}>Submit Comment</Text>
      </Pressable>
      <Pressable
        style={styles.closeButton}
        onPress={handleCommentModalClose}
      >
        <Text style={styles.buttonText}>Close</Text>
      </Pressable>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  commentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  commentModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  commentInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#FD2E2A',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Buttons;
