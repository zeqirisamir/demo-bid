import React, { useEffect, useState } from "react";
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

const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp["navigation"]>();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "Seller@gmail.com",
    password: "seller",
  });
  const [error, setError] = useState(false);
  const [userTypes, setUserTypes] = useState("buyer");
  const user = useSelector((state: RootState) => state.authReducer.user);
  const usertype = useSelector(
    (state: RootState) => state.authReducer.userType
  );
  const handleLogin = async () => {
    try {
      const { res } = await signIn(data);
      const status = res?.status;
      const type = res?.data?.data?.userType;
      console.log("status", res);

      if (status === 200) {
        if (type === userTypes) {
          dispatch(setUser(res?.data));
        } else {
          console.log(userTypes, "does not have an error", type);
          Alert.alert(`You do not have a ${userTypes} account`);
        }
      } else if (status === 401) {
        console.log("Status is not 200", res);
      }
      console.log("pressing", res?.data);
    } catch (error) {
      console.log("login error::", error);
    }
  };

  useEffect(() => {
    console.log(usertype);
  }, [data]);

  const onSignupPressed = () => {
    navigation.navigate("SignUp");
  };

  const handleUserTypeChange = (userType: string) => {
    setUserTypes(userType);
    dispatch(setUserType(userType));
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>Email or password is incorrect</Text>
      )}
      <TextInput
        placeholder="Email"
        value={data?.email}
        style={styles.input}
        onChangeText={(e) => setData({ ...data, email: e })}
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity onPress={onSignupPressed}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.main_blue,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
    color: Colors.main_blue,
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
  userTypeButtonText: {
    fontSize: 16,
  },
  selectedUserType: {
    borderColor: Colors.main_blue,
  },
});

export default LoginScreen;
