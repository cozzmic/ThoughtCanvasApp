import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



const InitialScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleGetStarted = () => {
    setLoading(true);

    // loader time
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login')
    }, 3000); // 3s
  };

  return (
    <LinearGradient
      colors={['#fedae1', '#FD2E2A']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤</Text>
        <Text style={styles.description}>
          𝘛𝘩𝘦 𝘞𝘰𝘳𝘭𝘥 𝘪𝘴 𝘢 𝘊𝘢𝘯𝘷𝘢𝘴 𝘵𝘰 𝘺𝘰𝘶𝘳 𝘪𝘮𝘢𝘨𝘪𝘯𝘢𝘵𝘪𝘰𝘯.
        </Text>
        <Text style={styles.description}>𝘍𝘪𝘯𝘥 𝘺𝘰𝘶𝘳𝘴 . . .</Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#FF6F61" style={styles.loader} />
          ) : (
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 45,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 18,
    fontFamily: 'System',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  getStartedButton: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default InitialScreen;