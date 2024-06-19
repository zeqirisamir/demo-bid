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
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { handleLogout } from "../../data/constants";

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
    category: "All",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
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
      aspect: [7, 7],
      quality: 0.9,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const firstAsset = result.assets[0];
      const resizedUri = await resizeImage(firstAsset.uri, 100, 100);

      const base64String = await FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(base64String);
      setImage({ base64: base64String || "", url: firstAsset.uri });
    }
  };
  const resizeImage = async (uri: string, width: number, height: number) => {
    const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width, height } }] // Resize operation
    );
    return resizedUri;
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
        imgSrc: image?.base64,
        userName: user?.data?.firstName,
        category: data?.category,
      });
      console.log(user?.data);
      if (res?.status === 201) {
        setCreated(true);
        setData({
          productName: "",
          description: "",
          startingBid: 0,
          duration: "1",
          imgSrc: "",
          category: "All",
        });
        setImage({ base64: "", url: "" });
        setTimeout(() => {
          setCreated(false);
        }, 3000);
      } else {
        console.log(res?.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStartingBidChange = (text: number) => {
    // Input validation to allow only numeric values
    const numericRegex = /^[0-9]*$/;
    if (
      numericRegex.test(text as unknown as string) ||
      (text as unknown as string) === ""
    ) {
      setData({ ...data, startingBid: text });
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title={"Dashboard"}
        //@ts-ignore
        handleBackBtn={() => handleLogout(dispatch)}
        containerStyle={{
          borderBottomWidth: 0,
        }}
        showCancelBtn={true}
        handleRightBtn={handleCreatePost}
        rightButtonText="Create"
        leftButtonText="Log out"
      />

      <View style={styles.container}>
        <Text style={styles.heading}>Create Post</Text>
        <TextInput
          placeholder="Product Name"
          value={data.productName}
          onChangeText={(text) => setData({ ...data, productName: text })}
          style={styles.input}
          placeholderTextColor={Colors.white}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor={Colors.white}
          value={data.description}
          onChangeText={(text) => setData({ ...data, description: text })}
          style={styles.description}
          multiline
        />
        <TextInput
          placeholder="Starting Bid £"
          placeholderTextColor={Colors.white}
          value={data.startingBid as unknown as string}
          //@ts-ignore
          onChangeText={handleStartingBidChange}
          style={styles.input}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          style={styles.pickerButton}
        >
          <Text style={styles.label}>Choose category: {data?.category}</Text>
        </TouchableOpacity>
        {showCategoryPicker && (
          <Picker
            selectedValue={data?.category}
            onValueChange={(itemValue) => {
              setData({ ...data, category: itemValue });
              setShowCategoryPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item color={Colors.white} label="All" value="All" />
            <Picker.Item
              color={Colors.white}
              label="Technology"
              value="Technology"
            />
            <Picker.Item color={Colors.white} label="Home" value="Home" />
            <Picker.Item color={Colors.white} label="Food" value="Food" />
            <Picker.Item color={Colors.white} label="Cars" value="Cars" />
          </Picker>
        )}

        <TouchableOpacity
          onPress={() => setShowPicker(!showPicker)}
          style={styles.pickerButton}
        >
          <Text style={styles.label}>
            Auction Duration: {data?.duration} day(s)
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <Picker
            selectedValue={data?.duration}
            onValueChange={(itemValue) => {
              setData({ ...data, duration: itemValue });
              setShowPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item color={Colors.white} label="1 day" value="1" />
            <Picker.Item color={Colors.white} label="2 days" value="2" />
            <Picker.Item color={Colors.white} label="3 days" value="3" />
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: Colors.white,
  },
  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: "20%",
    color: Colors.white,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    color: Colors.white,
  },
  uploadText: {
    fontWeight: "bold",
    color: Colors.yellow,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    color: Colors.white,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  uploadImg: {
    paddingVertical: 20,
  },
  success: {
    backgroundColor: Colors.yellow,
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
