import { Alert, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { PostDetailsNavigationProp } from "../../navigaton/Types";
import IconButton from "../../components/shared/IconButton";
import ProductDetailHeader from "../../components/products/productDetail/ProductDetailHeader";
import CustomButton from "../../components/shared/CustomButton";
import { Colors } from "../../theme/Colors";
import { SCREEN_HEIGHT } from "../../constants/Screen";
import {
  createBid,
  getAllPreviousBidsForPost,
} from "../../actions/posts/postsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AllBidsTypes } from "../../service/types";
import MainModal from "../../components/shared/MainModal";
import { setCurrentValue } from "../../redux/auth/AuthReducer";
import Header from "../../components/header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateValue } from "../../actions/auth/authActions";

const ProductDetail = ({ navigation, route }: PostDetailsNavigationProp) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const currentValue = useSelector(
    (state: RootState) => state.authReducer.currentValue
  );
  const [currentPrice, setCurrentPrice] = useState(product.startingBid);
  const [previousBids, setPreviousBids] = useState<AllBidsTypes[]>([]);
  const lastAmount =
    previousBids[previousBids?.length - 1]?.amount || currentPrice;
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log("usre from post details", user);

  useEffect(() => {
    const fetchPreviousBids = async () => {
      try {
        getAllPreviousBidsForPost(product?._id).then((res) => {
          console.log("testing specifi bids::::", res);
          setPreviousBids(res?.data?.data);
        });
        //setBids(response?.data?.data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    fetchPreviousBids();
  }, [product, currentValue]);

  const handleBid = async () => {
    try {
      const newPrice = Number(lastAmount) + 50;
      if (newPrice > currentValue) {
        Alert.alert("You dont have enogh money to bid o this product");
      } else {
        let data = {
          userId: user?._id,
          postId: product?._id,
          amount: newPrice,
        };
        // console.log("testing bidding::::", data);
        createBid(data).then((res) => {
          let finalOffer = currentValue - newPrice;
          console.log("created bid::::", res?.data);
          dispatch(setCurrentValue(finalOffer));
          handleDone(finalOffer);
        });
      }
    } catch (error) {
      console.error("Error bidding:", error);
    }
  };

  const handleDone = async (value: number) => {
    const token = await AsyncStorage.getItem("userToken");
    const data = {
      userId: user?._id,
      currentValue: value,
    };
    try {
      if (token) {
        const res = await updateValue(data, token);
        console.log("update value", res);

        if (res.res.status === 200) {
          dispatch(setCurrentValue(Number(value)));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header
        title={"Details"}
        showBackBtn={true}
        containerStyle={{ borderBottomWidth: 0 }}
        leftButtonText="Back"
        showCancelBtn
        handleBackBtn={() => navigation.goBack()}
      />
      <ScrollView>
        <Animated.View
          entering={FadeIn.delay(500)}
          style={[styles.iconButtonContainer, styles.backButton, { top: 0 }]}
        >
          {/* <IconButton
            testID="productDetailBackButton"
            icon="chevron-left"
            onPress={() => navigation.goBack()}
            iconColor="black"
            size="big"
            style={{ backgroundColor: Colors.main_white }}
          /> */}

          <Animated.Image
            sharedTransitionTag={`image_${product._id}`}
            source={{ uri: `data:image;base64,${product?.imgSrc}` }}
            style={styles.image}
          />
        </Animated.View>
        <View style={{ paddingHorizontal: 15, flex: 1, marginTop: 20 }}>
          <ProductDetailHeader furniture={product} />
          <View style={styles.line} />
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.price}>Starting Price: €{currentPrice}</Text>
              <View style={styles.line} />

              {previousBids?.length === 0 ? (
                <View />
              ) : (
                <View style={styles.currentBidCont}>
                  <Text style={[styles.description, { fontWeight: "600" }]}>
                    Current bid:
                  </Text>
                  <Text style={[styles.description, { fontWeight: "600" }]}>
                    €{lastAmount}
                  </Text>
                </View>
              )}

              <Text style={styles.nextBid}>
                Next bid will be: €
                {previousBids?.length === 0
                  ? currentPrice + 50
                  : Number(lastAmount) + 50}
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => setIsOpenModal(true)}
                roundness="full"
                title="Bid Now"
                style={{ backgroundColor: Colors.yellow, marginTop: 40 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <MainModal
        visible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onPress={() => {
          handleBid(), setIsOpenModal(false);
        }}
        title="Are you sure you want to place this bid?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main_white,
  },
  iconButtonContainer: {},
  backButton: {},
  heartButton: {
    right: 10,
  },
  image: {
    height: SCREEN_HEIGHT / 2,
    resizeMode: "cover",
    zIndex: -1,
    borderRadius: 4,
  },
  description: {
    fontSize: 17,
    fontWeight: "400",
    color: Colors.black_txt,
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
    color: Colors.yellow,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#DBDADC",
    alignSelf: "center",
  },

  currentBidCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextBid: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.fill_blue,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
});

export default ProductDetail;
