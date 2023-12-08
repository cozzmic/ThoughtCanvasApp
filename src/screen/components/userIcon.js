import React from 'react';
import { View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

const UserIcon = () => {
  return (
    <View style={styles.userIcon}>
      <SimpleLineIcons name="user" size={100} color="#FD2E2A" />
    </View>
  );
};

const styles = {
  userIcon: {
    margin: 10,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#fedae1',
  },
};

export default UserIcon;
