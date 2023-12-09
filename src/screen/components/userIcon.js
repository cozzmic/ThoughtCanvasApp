import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const UserIcon = ({icon}) => {
  return (
    <View style={styles.userIcon}>
      {icon ? (
        <Image source={{ uri: icon }} style={styles.imageIcon} />
      ) : (
        <SimpleLineIcons name="user" size={100} color="#FD2E2A" />
      )}
    </View>
  );
};

const styles = {
  userIcon: {
    margin: 10,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#fedae1',
    overflow: 'hidden', 
  },
  imageIcon: {
    width: 100,
    height: 100,
  },
};

export default UserIcon;
