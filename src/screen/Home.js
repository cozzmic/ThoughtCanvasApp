import React, { useState, useEffect }from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Header from './header';
import { LinearGradient } from 'expo-linear-gradient';


const Home = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await fetch("https://bloggler-backend.vercel.app/api/post");
          const data = await response.json();
          setPosts(data.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
  
      fetchPosts();
    }, []);

  return (
    <LinearGradient
      colors={['#fedae1', '#FD2E2A']}
      style={styles.container}
    >
        <Header 
          title = '𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤'
          bgColor= '#fedae1'
          textColor= '#FD2E2A'
          align= 'center'
          justify= 'center'
          size = {20}
        />

    </LinearGradient>
  )
}

const styles = StyleSheet.create ({
container: {
    flex: 1,
},   
})

export default Home