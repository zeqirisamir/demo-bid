import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import { Colors } from "../../theme/Colors";
import CoinStarIcon from "../../assets/icons/CoinStarIcon";
import { LinearGradient } from "expo-linear-gradient";
import { MoneySummaryProps } from "../../service/types";

export const MoneySummary = ({
  containerStyle,
  coins,
  disabled,
  linearGradientBorder = ["#FF7816", "#FF9900"],
  onPress,
  mode = "dark",
  svgUri,
}: MoneySummaryProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || !Boolean(onPress)}
      style={[styles.scoreContainer, containerStyle]}
      activeOpacity={0.75}
    >
      <LinearGradient
        colors={linearGradientBorder}
        style={styles.coinsContainerLinearGradient}
      >
        <LinearGradient
          colors={mode === "light" ? ["#fff", "#fff"] : ["#595858", "#000000"]}
          style={styles.coinsInnerLinearGradient}
        >
          {svgUri ? (
            <SvgUri width={20} height={20} uri={svgUri} />
          ) : (
            <CoinStarIcon />
          )}
          <Text
            style={[
              styles.scoreText,
              { color: mode === "light" ? Colors.black_txt : Colors.white },
            ]}
          >
            {coins}
          </Text>
          <Text
            style={[
              { color: mode === "light" ? Colors.black_txt : Colors.white },
            ]}
          >
            {"$"}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    marginVertical: 10,
    shadowColor: Colors.black_txt,
    shadowOffset: { width: 1, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  coinsContainerLinearGradient: {
    borderRadius: 100,
    alignItems: "center",
    width: 98,
    height: 38,
    display: "flex",
    justifyContent: "center",
  },
  coinsInnerLinearGradient: {
    width: 91,
    height: 31,
    borderRadius: 200,
    backgroundColor: Colors.bgreen,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  scoreText: {
    paddingLeft: 5,
  },
});
