import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Product } from "../../../navigaton/Types";
import { Colors } from "../../../theme/Colors";
type Props = {
  furniture: Product;
};
const ProductDetailHeader: FC<Props> = ({ furniture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>{furniture.productName}</Text>
        <Text style={styles.company}> By {furniture.userName}</Text>
      </View>
      {/* <View style={styles.ratingContainer}>
        <MaterialCommunityIcons name="star" color={"#FACC0F"} size={25} />
        <Text style={styles.ratingLabel}>4.9</Text>
      </View> */}
    </View>
  );
};
export default ProductDetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#545264",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.yellow,
  },
  company: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    marginVertical: 10,
  },
  ratingContainer: {
    borderColor: "#f0edf5",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 80,
    paddingVertical: 2,
  },
});
