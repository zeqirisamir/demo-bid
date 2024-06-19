// Profile.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth/authActions";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../navigaton/Types";
import { RootState } from "../../redux/store";
import { EditPhotoButton } from "../../components/editPhoto/EditPhoto";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const data = user.data;

  console.log("userData", user.data);

  return (
    <View style={styles.screen}>
      <Header
        title={"Profile"}
        showBackBtn
        showCancelBtn
        handleBackBtn={() => navigation.goBack()}
        containerStyle={{ borderBottomWidth: 0 }}
        leftButtonText={"back"}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {data.firstName} {data.lastName}
        </Text>
      </View>
      <View style={styles.container}>
        <EditPhotoButton showAddText />
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
  },
  nameText: { color: "black", fontSize: 16, fontWeight: "500" },
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
});

export default Profile;
