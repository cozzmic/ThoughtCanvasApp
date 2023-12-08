import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { AntDesign} from '@expo/vector-icons';

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };


  return (
    <View>
        <Pressable onPress={handleLikePress}>
          <AntDesign
            name={isLiked ? 'like1' : 'like2'}
            size={35}
            color={isLiked ? '#FD2E2A' : '#FD2E2A'}
          />
        </Pressable>
    </View>
  );
};


export default LikeButton;
