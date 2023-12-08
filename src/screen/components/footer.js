import React from 'react';
import { View, Text } from 'react-native';

const Footer = ({}) => {
  const footerStyle = {
    backgroundColor: '#fedae1',
    padding: 10,
    width : '100%', 
    flexDirection: 'row',
    height: '6%',
    alignItems: 'center',
    justifyContent : 'center',
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
  };

  return (
    <View style={footerStyle}>
      <Text 
        style={{  
        fontSize: 20, 
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        bottom: 10,
        color: '#FD2E2A'
        }}>
        Footer
      </Text>
    </View>
  );
};

export default Footer;
