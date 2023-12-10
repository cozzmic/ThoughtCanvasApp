import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState({
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc0YjdhNDFkNDRlMjg5MzRlZGNiMWMiLCJ1c2VyTmFtZSI6IkdhdXJhdiIsImVtYWlsIjoiR2F1cmF2LmNvbSIsImlhdCI6MTcwMjE5NDI2OCwiZXhwIjoxNzA0Nzg2MjY4fQ.QvWg84beS0YevdUWstUoPt979TGRfxpRGCdyeeVABCc",
    email: "Gaurav.com",
    userId: "6574b7a41d44e28934edcb1c",
  });
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
  alert('logout successfully')
    navigation.navigate("Login"); 
  };

  const handleGoToMyProfile = () => {
    navigation.navigate("MyProfile", { userId: userProfile.userId });
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
     
        <Pressable onPress={handleGoToMyProfile} style={styles.myProfileButton}>
          <Text style={styles.buttonText}>My Profile</Text>
        </Pressable>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#FD2E2A",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 400,
  },
  logoutButton: {
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  myProfileButton: {
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FD2E2A",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UserProfile;
