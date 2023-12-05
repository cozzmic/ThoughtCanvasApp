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
import Header from "./header";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTextInput = () => {
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

  const handleLogin = async () => {
    try {
      if (!handleTextInput()) {
        return; 
      }

      const body = {
        email: email,
        password: password,
      };
      alert('Login Successful');
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/login",
        body
      );

      console.log("Login successful:", response.data);

      await AsyncStorage.setItem("userData", JSON.stringify(response.data, email));

      navigation.navigate('Home');
    } catch (error) {
      alert('Incorrect Credentials');
      console.log("Error during Login:", error);

      const errorMessage = error?.response?.data?.message || 'An error occurred';

      console.log("Error message:", errorMessage);
    }
  };

  return (
    <LinearGradient colors={["#FD2E2A", "#fedae1"]} style={styles.container}>
      <Header 
        title='𝕋𝕙𝕠𝕦𝕘𝕙𝕥ℂ𝕒𝕟𝕧𝕒𝕤'
        bgColor='#fedae1'
        textColor='#FD2E2A'
        align='center'
        justify='center'
        size={30}
      />
      <View style={styles.whiteBox}>
        <Text style={styles.heading}>𝕃𝕠𝕘𝕚𝕟</Text>
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
          style={styles.loginButton}
          onPress={() => {
            if (handleTextInput()) {
              handleLogin();
              navigation.navigate("Home");
            }
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupLink}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
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

export default Login;
