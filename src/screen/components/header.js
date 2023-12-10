// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, bgColor, textColor, align, justify, size, userImage, onUserIconPress }) => {
  const headerStyle = {
    backgroundColor: bgColor,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    height: '10%',
    alignItems: align,
    justifyContent: justify,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 25,
    zIndex: 2,
    position: 'absolute',
    top: 0,
  };

  return (
    <View style={headerStyle}>
      <Text
        style={{
          fontSize: size,
          fontWeight: 'bold',
          textDecorationLine: 'underline',
          top: 15,
          color: textColor,
        }}
      >
        {title}
      </Text>
      {userImage && onUserIconPress ? (
        <TouchableOpacity onPress={onUserIconPress}>
          <Image source={{ uri: userImage }} style={{ width: 35, height: 35, borderRadius: 17.5, marginLeft: 10, marginTop: 28 }} />
        </TouchableOpacity>
      ) : (
        <Ionicons name="person" size={35} color={textColor} style={{ marginLeft: 10, marginTop: 28, }} />
      )}
    </View>
  );
};

export default Header;
