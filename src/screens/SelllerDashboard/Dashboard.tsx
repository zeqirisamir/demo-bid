import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DashboardNavigationProp } from "../../navigaton/Types";
import Header from "../../components/header/Header";
import { logout } from "../../actions/auth/authActions";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../theme/Colors";
import { createPost } from "../../actions/posts/postsActions";
import { RootState } from "../../redux/store";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DashboardNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [data, setData] = useState({
    productName: "",
    description: "",
    startingBid: 0,
    duration: "1",
    imgSrc: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [auctionDuration, setAuctionDuration] = useState("1");
  const [image, setImage] = useState({
    base64: "",
    url: "",
  });
  const [created, setCreated] = useState(false);

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

      console.log(JSON.stringify(firstAsset.base64));

      setImage({ base64: firstAsset.base64 || "", url: firstAsset.uri });
    }
  };

  const handleCreatePost = async () => {
    console.log(data);
    console.log(image);
    try {
      const res = await createPost({
        productName: data?.productName,
        description: data?.description,
        startingBid: data?.startingBid,
        duration: data?.duration,
        imgSrc: image.base64,
        userName: user.name,
      });

      if (res?.status === 201) {
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStartingBidChange = (text) => {
    // Input validation to allow only numeric values
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text) || text === "") {
      setData({ ...data, startingBid: text });
    }
  };

  return (
    <>
      <Header
        title={"Dashboard"}
        handleBackBtn={() => dispatch(logout())}
        containerStyle={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
        }}
        showCancelBtn={true}
        handleRightBtn={handleCreatePost}
        rightButtonText="Create"
      />

      <View style={styles.container}>
        <Text style={styles.heading}>Create Post</Text>
        <TextInput
          placeholder="Product Name"
          value={data.productName}
          onChangeText={(text) => setData({ ...data, productName: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={data.description}
          onChangeText={(text) => setData({ ...data, description: text })}
          style={styles.description}
          multiline
        />
        <TextInput
          placeholder="Starting Bid £"
          value={data.startingBid as unknown as string}
          onChangeText={handleStartingBidChange}
          style={styles.input}
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={() => setShowPicker(!showPicker)}
          style={styles.pickerButton}
        >
          <Text style={styles.label}>
            Auction Duration: {auctionDuration} day(s)
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <Picker
            selectedValue={auctionDuration}
            onValueChange={(itemValue) => {
              setData({ ...data, duration: itemValue });
              setShowPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="1 day" value="1" />
            <Picker.Item label="2 days" value="2" />
            <Picker.Item label="3 days" value="3" />
          </Picker>
        )}
        <TouchableOpacity
          style={styles.uploadImg}
          onPress={handleLaunchGallery}
        >
          <Text style={styles.uploadText}>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image.url }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )}
        {created && (
          <View style={styles.success}>
            <Text style={{ color: Colors.white }}>
              Post Created Succesfully
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: "20%",
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    color: Colors.grey_text,
  },
  uploadText: {
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  uploadImg: {
    paddingVertical: 20,
  },
  success: {
    backgroundColor: Colors.black_txt,
    paddingVertical: 10,
    width: "95%",
    color: Colors.white,
    borderRadius: 10,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default DashboardScreen;
