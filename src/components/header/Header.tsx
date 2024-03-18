import React, { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "./Icon";
import theme from "../../theme";
import { Colors } from "../../theme/Colors";

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
}: HeaderProps) => {
  const backBtn = () =>
    showBackBtn ? (
      <TouchableOpacity
        onPress={handleBackBtn}
        activeOpacity={0.7}
        style={[styles.headerLeftBtn]}
      >
        <Text>back</Text>
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
        {/* {showSettingsBtn && (
          <Icon size={23} color={theme.Colors.black_txt} name="back" />
        )} */}
      </TouchableOpacity>
    ) : null;

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: Colors.light_grey_border,
  },
  headerContainerLight: {
    borderBottomWidth: 0.5,
    borderColor: "#CBCDCD",
  },
  headerContainerDark: {
    backgroundColor: "#000",
  },
  titleText: {
    color: "#010D18",
    position: "absolute",
    alignSelf: "center",
    textTransform: "capitalize",
    paddingBottom: 20,
  },
  titleTextDark: {
    color: "#fff",
  },
  resumeText: {
    color: "#3E7FFF",
  },
  headerLeftBtn: {
    height: 40,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
  },
  headerLeftBtnHe: {
    position: "absolute",
    right: 20,
    alignItems: "flex-end",
  },
  headerRightBtn: {
    position: "absolute",
    right: 20,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerRightBtnHe: {
    left: 20,
    alignItems: "flex-start",
  },
});

export default Header;
