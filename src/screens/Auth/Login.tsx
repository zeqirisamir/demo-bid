import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/auth/authActions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Colors } from "../../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../navigaton/Types";
import { setUser, setUserType } from "../../redux/auth/AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp["navigation"]>();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTypes, setUserTypes] = useState("buyer");
  const user = useSelector((state: RootState) => state.authReducer.user);
  const usertype = useSelector(
    (state: RootState) => state.authReducer.userType
  );

  // Animation values
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0)).current;
  const linearGradientBorder = [
    Colors.yellow,
    Colors.yellow,
    Colors.main_white,
  ];
  useEffect(() => {
    Animated.timing(inputAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(imageScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedInputStyles = {
    transform: [
      {
        translateX: inputAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [200, 0],
        }),
      },
    ],
  };

  const animatedButtonStyles = {
    transform: [
      {
        translateY: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  const animatedImageStyles = {
    transform: [
      {
        scale: imageScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const saveUserDataToStorage = async (data: string) => {
    try {
      await AsyncStorage.setItem("userData", data);
    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  const saveTokenToStorage = async (data: string) => {
    try {
      await AsyncStorage.setItem("userToken", data);
    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  // useEffect(() => {
  //   const getPreviousEmails = async () => {
  //     const previousUserData = await AsyncStorage.getItem("userData");
  //     if (previousUserData) {
  //       console.log("previos data", previousUserData);

  //       const userData = JSON.parse(previousUserData);
  //       setData(userData);
  //       setLoading(true);
  //       await handleLogin(userData);
  //       setLoading(false);
  //     }
  //   };
  //   getPreviousEmails();
  // }, []);

  const handleLogin = async (loginData = data) => {
    try {
      const { res, err } = await signIn(loginData);
      const status = res?.status;
      const type = res?.data?.data?.userType;
      const error = err?.response?.data?.status;
      console.log("status", res?.data?.token);

      if (status === 200) {
        if (type === userTypes) {
          dispatch(setUser(res?.data));
          dispatch(setUserType(res?.data?.userType));
          await saveUserDataToStorage(JSON.stringify(res?.data?.data));
          await saveTokenToStorage(res?.data?.token);
        } else {
          console.log(userTypes, "does not have an error", type);
          Alert.alert(`You do not have a ${userTypes} account`);
        }
      } else if (error === 401) {
        console.log("Password incorrect", res);
        setError(true);
        setErrorMessage("Password is incorrect");
      } else if (error === 402) {
        setError(true);
        setErrorMessage("Email is incorrect");
      }
      console.log("pressing", res);
    } catch (error) {
      console.log("login error::", error);
    }
  };

  const onSignupPressed = () => {
    navigation.navigate("SignUp");
  };

  const handleUserTypeChange = (userType: string) => {
    setUserTypes(userType);
    dispatch(setUserType(userType));
  };
  if (loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={linearGradientBorder}
        style={styles.containerLinearGradient}
      >
        <Animated.Image
          source={require("../../assets/auction.png")}
          style={[styles.image, animatedImageStyles]}
        />
        <Animated.View
          style={[styles.animatedInputContainer, animatedInputStyles]}
        >
          {error && <Text style={styles.error}>{errorMessage}</Text>}
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            value={data?.email}
            style={styles.input}
            placeholderTextColor={Colors.grey_text}
            onChangeText={(e) => setData({ ...data, email: e })}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.grey_text}
            value={data?.password}
            style={styles.input}
            onChangeText={(e) => setData({ ...data, password: e })}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </Animated.View>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userTypes === "buyer" && styles.selectedUserType,
            ]}
            onPress={() => handleUserTypeChange("buyer")}
          >
            <Text style={styles.userTypeButtonText}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userTypes === "seller" && styles.selectedUserType,
            ]}
            onPress={() => handleUserTypeChange("seller")}
          >
            <Text style={styles.userTypeButtonText}>Seller</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[styles.animatedButtonContainer, animatedButtonStyles]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(data)}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.animatedButtonContainer2, animatedButtonStyles]}
        >
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity onPress={onSignupPressed}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.black_txt,
  },
  input: {
    width: "90%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light_grey_border,
    fontSize: 16,
    color: Colors.fill_switch,
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.yellow,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  containerLinearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  error: {
    color: Colors.error_red_txt,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  signupText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.yellow,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.disabled_grey,
    width: "40%",
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.disabled_grey,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userTypeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.light_grey_border,
  },
  image: {
    width: 100,
    height: 100,
  },
  userTypeButtonText: {
    fontSize: 16,
    color: Colors.fill_switch,
  },
  selectedUserType: {
    borderColor: Colors.yellow,
  },
  animatedInputContainer: {
    width: "100%",
    alignItems: "center",
  },
  animatedButtonContainer: {
    position: "absolute",
    bottom: 220,
    width: "100%",
    alignItems: "center",
  },
  animatedButtonContainer2: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    alignItems: "center",
  },
});

export default LoginScreen;
