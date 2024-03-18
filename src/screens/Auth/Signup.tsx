import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/auth/authActions";
import { Colors } from "../../theme/Colors";
import Header from "../../components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../navigaton/Types";
import * as ImagePicker from "expo-image-picker";
import { UserPicture } from "../../service/types";
import { EditPhotoButton } from "../../components/editPhoto/EditPhoto";

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AuthNavigationProp["navigation"]>();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "buyer",
  });
  const [userPicture, setUserPicture] = useState<UserPicture>({
    base64: "",
    url: "",
  });

  const handleSubmit = async () => {
    const isBuyer = data.userType === "buyer";
    const requestData = { ...data, profilePic: userPicture.base64 };
    try {
      const { res } = await signUp(requestData, isBuyer);
      console.log("from ni", res);
      if (res.status === 200) {
        Alert.alert("User created successfullys");
      }
    } catch (error: any) {}
  };

  const handleUserTypeChange = (userType: string) => {
    setData({ ...data, userType });
  };

  const handleLaunchGallery = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [2, 2],
      quality: 0.2,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const firstAsset = result.assets[0];

      console.log(JSON.stringify(firstAsset));

      setUserPicture({ base64: firstAsset.base64 || "", url: firstAsset.uri });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={"Sign Up"} handleBackBtn={() => navigation.goBack()} />

      <View style={styles.container}>
        <EditPhotoButton
          showAddText={true}
          containerStyle={{}}
          form={"circle"}
          userPictureUrl={userPicture.url}
          disableBtn={false}
          onPress={handleLaunchGallery}
          hasError={false}
        />
        <TextInput
          placeholder="Firstname"
          value={data?.firstName}
          style={styles.input}
          onChangeText={(e) => setData({ ...data, firstName: e })}
        />
        <TextInput
          placeholder="LastName"
          value={data?.lastName}
          style={styles.input}
          onChangeText={(e) => setData({ ...data, lastName: e })}
        />
        <TextInput
          placeholder="Email"
          value={data?.email}
          style={styles.input}
          onChangeText={(e) => setData({ ...data, email: e.toLowerCase() })}
        />
        <TextInput
          placeholder="Password"
          value={data?.password}
          style={styles.input}
          onChangeText={(e) => setData({ ...data, password: e })}
          secureTextEntry
        />

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              data.userType === "buyer" && styles.selectedUserType,
            ]}
            onPress={() => handleUserTypeChange("buyer")}
          >
            <Text style={styles.userTypeButtonText}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              data.userType === "seller" && styles.selectedUserType,
            ]}
            onPress={() => handleUserTypeChange("seller")}
          >
            <Text style={styles.userTypeButtonText}>Seller</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light_grey_border,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.main_blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
    width: "90%",
  },
  userTypeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.light_grey_border,
  },
  userTypeButtonText: {
    fontSize: 16,
  },
  selectedUserType: {
    borderColor: Colors.main_blue,
  },
});

export default Signup;
