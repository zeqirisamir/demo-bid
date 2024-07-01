import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../theme/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Product } from "../../navigaton/Types";
import { calculateRemainingTime } from "../../data/constants";

interface PostProps {
  product: Product;
  onDeletePress?: (id: string) => void;
  isSeller?: boolean;
}

const Post: React.FC<PostProps> = ({ product, onDeletePress, isSeller }) => {
  const remainingTime = calculateRemainingTime(
    product?.createdAt || "",
    product.duration
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product?.imgSrc }}
        style={{
          width: 50,
          height: 80,
          borderRadius: 10,
          alignSelf: "center",
          backgroundColor: "grey",
        }}
      />
      <View style={styles.content}>
        <Text style={styles.productName}>{product?.productName}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product?.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {isSeller ? (
            <Text style={styles.duration}> {remainingTime}</Text>
          ) : (
            <Text style={styles.duration}>
              Duration: {product?.duration} days
            </Text>
          )}
          {isSeller && (
            <TouchableOpacity
              style={styles.deleteBox}
              onPress={() => onDeletePress(String(product?._id))}
            >
              <Text style={styles.deleteText}>Delete Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.startingBid}>{product?.startingBid}£</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main_white,
    padding: 10,
    marginBottom: 10,
    width: "95%",
    flexDirection: "row",
    alignSelf: "center",
  },
  content: {
    padding: 5,
    marginLeft: 10,
    width: "75%",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  startingBid: {
    fontSize: 16,
    color: Colors.grey_text,
    marginBottom: 5,
    alignSelf: "center",
  },
  duration: {
    fontSize: 14,
    color: "#999",
  },
  deleteText: {
    fontSize: 16,
    color: Colors.error_red_txt,
    marginBottom: 5,
    alignSelf: "center",
    backgroundColor: Colors.error_red_bg,
    padding: 2,
    borderRadius: 4,
  },
  deleteBox: {},
});

export default Post;
