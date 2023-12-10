import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/header";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTextInput = () => {
    if (!username.trim()) {
      alert('Unfilled Details');
      return false;
    }
    if (!email.trim()) {
      alert('Unfilled Details');
      return false;
    }
    if (!password.trim()) {
      alert('Unfilled Details');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      if (!handleTextInput()) {
        return; 
      }

      const body = {
        userName:username,
        email: email,
        password: password,
      };
      alert('Signup Successful');
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/signup",
        body
      );

      console.log("Signup successful:", response.data);

      await AsyncStorage.setItem("userData", JSON.stringify(response.data, email));

      navigation.navigate('Home');
    } catch (error) {
      alert('Incorrect Credentials');
      console.log("Error during Signup:", error);

      const errorMessage = error?.response?.data?.message || "An error occurred";
      alert(`Signup failed: ${errorMessage}`);
      
    }
  };

  return (
    <LinearGradient colors={["#FD2E2A", "#fedae1"]} style={styles.container}>
       <Header
        title="𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤"
        bgColor="#fedae1"
        textColor="#FD2E2A"
        align="center"
        justify="space-between"
        size={30}
       
    
        showUserIcon={false}
      />
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>𝕊𝕚𝕘𝕟 𝕌𝕡</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => {
            if (handleTextInput()) {
              handleSignup();
              navigation.navigate("Home");
            }
          }}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FD2E2A",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  signupButton: {
    backgroundColor: "#FD2E2A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#FD2E2A', 
    marginLeft: 5,
    fontSize: 15,
    textDecorationLine: 'underline'
  },
});

export default Signup;
