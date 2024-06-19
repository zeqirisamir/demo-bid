import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated,
} from "react-native";
import CustomButton from "../shared/CustomButton";
import { Colors } from "../../theme/Colors";
import { Product } from "../../navigaton/Types";
import { likePost } from "../../actions/posts/postsActions";

export type ProductProps = {
  product: Product;
  onPressCard: () => void;
  tag: string;
  onPress2Card: (id: number) => void;
};

const ProductCard = ({
  product,
  onPressCard,
  tag,
  onPress2Card,
}: ProductProps) => {
  const translateX = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
      <Pressable onPress={onPressCard}>
        <Image
          source={{ uri: `data:image;base64,${product?.imgSrc}` }}
          style={styles.image}
        />
      </Pressable>
      <Pressable onPress={onPressCard} style={styles.content}>
        <View testID={`productCard${product?._id}`}>
          <Text style={styles.title}>{product?.productName}</Text>
          {/* <Text style={styles.company}>By {product.}</Text> */}
          <Text style={styles.description}>{product?.description}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${product?.startingBid}</Text>
          <CustomButton
            onPress={onPressCard}
            title="Details"
            style={styles.button}
            roundness={"full"}
          />
          {/* <CustomButton
            onPress={() => onPress2Card(product?._id)}
            title="delete"
            style={styles.button}
            roundness={"full"}
          /> */}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderBottomWidth: 0.2,
  },
  image: {
    resizeMode: "stretch",
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black_txt,
  },
  company: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark_grey,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.grey_text,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.yellow,
  },
  button: {
    backgroundColor: Colors.main_white,
    height: 34,
    marginLeft: 16,
    paddingHorizontal: 16,
  },
});

export default ProductCard;
