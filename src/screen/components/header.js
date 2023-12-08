import React from 'react';
import { View, Text } from 'react-native';

const Header = ({title, bgColor, textColor, align, justify, size}) => {
  const headerStyle = {
    backgroundColor: bgColor,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    height: '10%',
    textAlign: align,
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
    top: 0
  };

  return (
    <View style={headerStyle}>
      <Text 
        style={{  
        fontSize: size, 
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        top: 25,
        color: textColor
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
