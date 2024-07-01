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
        <View testID={`productCard${product?._id}`} style={styles.descCont}>
          <Text style={styles.title}>{product?.productName}</Text>

          {/* <Text numberOfLines={2} style={styles.description}>
            {product?.description}
          </Text> */}
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${product?.startingBid}</Text>
          {/* <CustomButton
            onPress={onPressCard}
            title="Details"
            style={styles.button}
            roundness={"medium"}
            variant="text"
          /> */}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    borderRadius: 4,
    //padding: 10,
    marginVertical: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 3.84,
    //borderBottomWidth: 0.2,
    width: 175,
    alignContent: "center",
    //borderLeftWidth: 0.5,
    borderColor: Colors.dark_grey_border,
    marginLeft: 10,
  },
  image: {
    resizeMode: "cover",
    width: 175,
    height: 220,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  descCont: {
    height: 30,
    justifyContent: "flex-start",
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
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.yellow,
  },
  button: {
    marginRight: 10,
    paddingHorizontal: 16,
  },
});

export default ProductCard;
