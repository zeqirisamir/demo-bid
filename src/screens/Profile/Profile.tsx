// Profile.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/auth/authActions";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../navigaton/Types";
import { RootState } from "../../redux/store";
import { EditPhotoButton } from "../../components/editPhoto/EditPhoto";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserToken } from "../../data/constants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const data = user;

  const [userInfo, setuserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  // const token = getUserToken();

  // console.log("token", token);

  const handleGetPosts = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token) {
      const data = {
        firstName: "Test",
        lastName: "Test",
        email: "Something",
        password: "Something",
      };
      try {
        const res = await updateUser(data, token);

        console.log("data", res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  handleGetPosts();
  return (
    <View style={styles.screen}>
      <View style={{ height: 100 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <AntDesign name="left" size={25} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <AntDesign name="user" size={25} color="#666" />
        <Text style={styles.nameText}>
          Name: {data?.firstName} {data?.lastName}
        </Text>
      </View>

      <View style={styles.nameContainer}>
        <AntDesign name="contacts" size={25} color="#666" />
        <Text style={styles.nameText}>Email: {data?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main_white,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",

    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.main_white,
  },
  nameContainer: {
    display: "flex",
    padding: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.yellow,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  nameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    padding: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: Colors.dark_grey,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 45,
    padding: 10,
    left: 5,
  },
});

export default Profile;
