import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  SharedTransition,
  withTiming,
} from "react-native-reanimated";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { PostDetailsNavigationProp } from "../../navigaton/Types";
import IconButton from "../../components/shared/IconButton";
import ProductDetailHeader from "../../components/products/productDetail/ProductDetailHeader";
import ColorPicker from "../../components/products/productDetail/ColorPicker";
import QuantitySelector from "../../components/products/productDetail/QuantitySelector";
import CustomButton from "../../components/shared/CustomButton";
import { Colors } from "../../theme/Colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/Screen";

const ProductDetail = ({ navigation, route }: PostDetailsNavigationProp) => {
  const { product } = route.params;
  const [amount, setAmount] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          styles.iconButtonContainer,
          styles.backButton,
          { top: insets.top + 20 },
        ]}
      >
        <IconButton
          testID="productDetailBackButton"
          icon="chevron-left"
          onPress={() => navigation.goBack()}
          iconColor="black"
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          styles.iconButtonContainer,
          styles.heartButton,
          { top: insets.top + 20 },
        ]}
      >
        <IconButton
          icon="heart"
          iconFamily="MaterialCommunityIcons"
          iconColor="red"
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </Animated.View>
      <Animated.Image
        sharedTransitionTag={`image_${product.id}`}
        source={product.imgSrc}
        style={styles.image}
      />
      <View style={{ paddingHorizontal: 15, flex: 1, marginTop: 20 }}>
        <ProductDetailHeader furniture={product} />

        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.colorAndQuantity}>
          <ColorPicker />

          <QuantitySelector amount={amount} setAmount={setAmount} />
        </View>
        <View style={styles.line} />
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.startingBid}</Text>
          <CustomButton
            roundness="full"
            title="Buy Now"
            style={{ backgroundColor: "green" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconButtonContainer: {
    position: "absolute",
  },
  backButton: {
    left: 10,
  },
  heartButton: {
    right: 10,
  },
  image: {
    width: "100%",
    height: SCREEN_HEIGHT / 2,
    resizeMode: "stretch",
    zIndex: -1,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.grey_text,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  colorAndQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    borderTopColor: "blue",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.main_blue,
  },
  line: {
    width: SCREEN_WIDTH,
    height: 1,
    backgroundColor: "#DBDADC",
    alignSelf: "center",
  },
});

export default ProductDetail;
