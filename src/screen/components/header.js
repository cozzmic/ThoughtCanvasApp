import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const Header = ({ title, align, justify, showUserIcon }) => {
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tokenResponse = await axios.get(
          "https://bloggler-backend.vercel.app/api/user/login"
        );

        const token = tokenResponse.data?.access_token;

        if (token) {
          setAccessToken(token);

          const userResponse = await axios.get(
            "https://bloggler-backend.vercel.app/api/user/getUser?id=userId",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userData = userResponse.data;

          if (userData && userData.imageUrl) {
            console.log("User Image URL:", userData.imageUrl);
            setUserImageUrl(userData.imageUrl);
          }
        } else {
          console.error("Access token not available");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const headerStyle = {
    backgroundColor: "#fedae1",
    padding: 10,
    width: "100%",
    flexDirection: "row",
    height: "10%",
    textAlign: align,
    justifyContent: justify,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 25,
    zIndex: 2,
    position: "absolute",
    top: 0,
  };

  const userIconStyle = {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "blue",
  };

  return (
    <View style={headerStyle}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textDecorationLine: "underline",
          top: 25,
          color: "#FD2E2A",
          flex: 1,
        }}
      >
        {title}
      </Text>

      {showUserIcon && userImageUrl ? (
        <View style={userIconStyle}>
          <Image
            source={{ uri: userImageUrl }}
            style={{ width: 35, height: 35, borderRadius: 17.5 }}
            onError={() => console.log("Image load error")}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Header;
