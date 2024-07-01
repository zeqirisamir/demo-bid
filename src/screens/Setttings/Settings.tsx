// Settings.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../navigaton/Types";
import { handleLogout } from "../../data/constants";

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();

  return (
    <View style={styles.screen}>
      <Header
        title={"Settings"}
        showBackBtn
        showCancelBtn
        handleBackBtn={() => navigation.navigate("Home")}
        containerStyle={{ borderBottomWidth: 0 }}
        leftButtonText={"Home"}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogout(dispatch)}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.black_txt,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.black_txt,
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
    color: Colors.fill_switch,
  },
});

export default Settings;
