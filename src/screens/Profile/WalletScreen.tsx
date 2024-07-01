import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../navigaton/Types";
import { RootState } from "../../redux/store";
import AntDesign from "react-native-vector-icons/AntDesign";
import { setCurrentValue } from "../../redux/auth/AuthReducer";
import { updateValue } from "../../actions/auth/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WalletScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);

  const userValue = useSelector(
    (state: RootState) => state.authReducer.currentValue
  );

  const [value, setValue] = useState("0");

  console.log("userData", user.data);

  const handleDone = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const data = {
      userId: user?._id,
      currentValue: value,
    };
    try {
      if (token) {
        const res = await updateValue(data, token);
        console.log("update value", res);

        if (res.res.status === 200) {
          dispatch(setCurrentValue(Number(value)));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <View style={styles.container}>
        <Text>Current amount: {userValue}</Text>
      </View>

      <View style={styles.container}>
        <Text> Import money to the app</Text>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={"Search"}
          onChangeText={setValue}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.done} onPress={handleDone}>
          <Text>Done</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    paddingVertical: 20,
    backgroundColor: Colors.main_white,
    alignItems: "center",
  },
  nameContainer: {
    display: "flex",
    padding: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
  },
  nameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: Colors.yellow,
    padding: 10,
    borderRadius: 4,
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
  input: {
    marginLeft: 10,
    fontSize: 20,
    color: "#333",
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: Colors.grey_text,
    padding: 10,
  },
  done: {
    padding: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 10,
  },
});

export default WalletScreen;
