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

const SignUp = ({navigation}) => {
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

  const handleSignUp = async () => {
    try {
        if(!handleTextInput()) {
           return;
        }
      const body = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/signup",
        body
      );
      alert('Sign-Up Successful');
      console.log("Sign-Up successful:", response.data);

      await AsyncStorage.setItem("userData", JSON.stringify(response.data, username));

      navigation.navigate('Home');
    } catch (error) {
      alert('Error: Try Again');
      console.log("Error during Sign-Up:", error);

      const errorMessage = error?.response?.data?.message || 'An error occurred';

      console.log("Error message:", errorMessage);

    }
  };

  return (
    <LinearGradient colors={["#FD2E2A", "#fedae1"]} style={styles.container}>
      <Header 
        title = '𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤'
        align= 'center'
        justify= 'center'
        showUserIcon={false}
      />
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>𝕊𝕚𝕘𝕟 𝕌𝕡</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            required
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          required
        />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {
            handleSignUp();
            // navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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
  loginButton: {
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

export default SignUp;
