import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../theme/Colors";

// Define interface for post data
interface PostProps {
  _id: string;
  productName: string;
  description: string;
  startingBid: number;
  duration: string;
  image: string;
}

const Post: React.FC<PostProps> = ({
  _id,
  productName,
  description,
  startingBid,
  duration,
  image,
}) => {
  return (
    <View style={styles.container} id={_id}>
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 80, borderRadius: 10, alignSelf: "center" }}
      />
      <View style={styles.content}>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.duration}>Duration: {duration} days</Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.startingBid}>{startingBid}£</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
});

export default Post;
