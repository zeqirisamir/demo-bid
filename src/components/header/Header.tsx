import React, { useEffect, useRef } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "./Icon";
import theme from "../../theme";
import { Colors } from "../../theme/Colors";
import { MoneySummary } from "../MoneySummary/MoneySummary";
import AntDesign from "react-native-vector-icons/AntDesign";

interface HeaderProps {
  darkMode?: boolean;
  showBackBtn?: boolean;
  handleBackBtn?: () => void;
  title?: string;
  showCancelBtn?: boolean;
  showSettingsBtn?: boolean;
  handleRightBtn?: () => void;
  containerStyle?: {};
  rightButtonText?: string;
  showSummary?: boolean;
  leftButtonText?: string;
  showLeftIcon?: boolean;
}

const Header = ({
  darkMode = false,
  showBackBtn = true,
  handleBackBtn = () => {},
  title = "",
  showCancelBtn = false,
  showSettingsBtn = false,
  containerStyle = {},
  handleRightBtn = () => {},
  rightButtonText = "",
  leftButtonText = "",
  showSummary = false,
  showLeftIcon,
}: HeaderProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const backBtn = () =>
    showBackBtn ? (
      <TouchableOpacity
        onPress={handleBackBtn}
        activeOpacity={0.7}
        style={[styles.headerLeftBtn]}
      >
        {showLeftIcon && <AntDesign name="setting" size={25} color="#666" />}
        <Text style={styles.resumeText}>{leftButtonText}</Text>
        {/* <Icon name={"back"} fill={darkMode ? "#fff" : "#4A4D4F"} /> */}
      </TouchableOpacity>
    ) : null;

  const content = () =>
    showCancelBtn || showSettingsBtn ? (
      <TouchableOpacity
        onPress={handleRightBtn}
        activeOpacity={0.7}
        style={styles.headerRightBtn}
      >
        {showCancelBtn && (
          <Text style={styles.resumeText}>{rightButtonText}</Text>
        )}
        {showSettingsBtn && (
          <Text style={styles.resumeText}> Settings</Text>

          // <Icon size={23} color={theme.Colors.black_txt} name="back" />
        )}
      </TouchableOpacity>
    ) : null;

  return (
    <Animated.View style={[styles.main, { transform: [{ translateY }] }]}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <View
        style={[
          styles.headerContainer,
          darkMode ? styles.headerContainerDark : styles.headerContainerLight,
          containerStyle,
        ]}
      >
        {backBtn()}

        {title && (
          <Text style={[styles.titleText, darkMode && styles.titleTextDark]}>
            {title}
          </Text>
        )}

        {content()}
      </View>
      {showSummary && (
        <MoneySummary
          mode="light"
          linearGradientBorder={["#FEDA2C", "#FDAC16"]}
          coins={122}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    backgroundColor: Colors.yellow,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
    alignItems: "center",
  },
  headerContainerLight: {
    borderBottomWidth: 0.5,
    borderColor: "#CBCDCD",
  },
  headerContainerDark: {
    backgroundColor: "#000",
  },
  titleText: {
    color: Colors.yellow,
    textTransform: "capitalize",
    paddingVertical: 5,
    position: "absolute",
    alignSelf: "center",
    left: "48%",
  },
  titleTextDark: {
    color: "#fff",
  },
  resumeText: {
    color: Colors.fill_switch,
  },
  headerLeftBtn: {
    height: 40,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  headerRightBtn: {
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Header;
