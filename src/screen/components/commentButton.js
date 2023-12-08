import React, { useState } from 'react';
import { Pressable, Modal, TextInput, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CommentButton = () => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentPress = () => {
    setIsCommentModalVisible(true);
  };

  const handleCommentModalClose = () => {
    setIsCommentModalVisible(false);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted:', commentText);
    setCommentText('');
    setIsCommentModalVisible(false);
  };

  return (
    <View>
      <Pressable onPress={handleCommentPress}>
        <FontAwesome name="comment-o" size={35} color="#FD2E2A" />
      </Pressable>
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

export default CommentButton;
