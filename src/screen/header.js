import React from 'react';
import { View, Text } from 'react-native';

const Header = ({title, bgColor, textColor, align, justify, size}) => {
  const headerStyle = {
    backgroundColor: bgColor,
    padding: 10,
    width : '100%', 
    flexDirection: 'row',
    height: '10%',
    alignItems: align,
    justifyContent : justify,
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
        top: 10,
        color: textColor
        }}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
