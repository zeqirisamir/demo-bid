import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  SharedTransition,
  withTiming,
} from "react-native-reanimated";
import { PostDetailsNavigationProp } from "../../navigaton/Types";
import IconButton from "../../components/shared/IconButton";
import ProductDetailHeader from "../../components/products/productDetail/ProductDetailHeader";
import CustomButton from "../../components/shared/CustomButton";
import { Colors } from "../../theme/Colors";
import { SCREEN_HEIGHT } from "../../constants/Screen";
import {
  createBid,
  getAllPreviousBidsForPost,
  getAllPersonalBiddings,
  likePost,
  unlikePost,
  updatePost,
} from "../../actions/posts/postsActions";
import { getUserToken } from "../../data/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AllBidsTypes } from "../../service/types";
import MainModal from "../../components/shared/MainModal";
import { ScrollView } from "react-native-gesture-handler";

const ProductDetail = ({ navigation, route }: PostDetailsNavigationProp) => {
  const { product } = route.params;
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [liked, setLiked] = useState(product.like);
  const [currentPrice, setCurrentPrice] = useState(product.startingBid);
  const [previousBids, setPreviousBids] = useState<AllBidsTypes[]>([]);
  const lastAmount = previousBids[previousBids?.length - 1]?.amount;
  const [isOpenModal, setIsOpenModal] = useState(false);

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
  }, [product]);

  useEffect(() => {
    const handlePersonalBids = async () => {
      try {
        const newPrice = currentPrice + 50; // Increase the price by 50 for bidding
        const newProduct = { ...product, startingBid: newPrice };
        console.log("product :::: ", product);
        console.log("updated :::: ", newProduct);

        let data = {
          userId: user?.data?._id,
          postId: product?._id,
          amount: newPrice,
        };

        getAllPersonalBiddings(data.userId).then((res) => {
          //console.log("testing all bids::::", res);
        });

        // updatePost(product._id, newProduct).then((res) => {
        //   console.log(res);
        //   setCurrentPrice(newPrice);
        // });
      } catch (error) {
        console.error("Error bidding:", error);
      }
    };
    handlePersonalBids();
  }, [product]);

  const handleBid = async () => {
    try {
      const newPrice = lastAmount + 50; // Increase the price by 50 for bidding
      const newProduct = { ...product, startingBid: newPrice };

      let data = {
        userId: user?.data?._id,
        postId: product?._id,
        amount: newPrice,
      };
      // console.log("testing bidding::::", data);
      createBid(data).then((res) => {
        console.log("testing bidding::::", res?.data);
      });

      // updatePost(product._id, newProduct).then((res) => {
      //   console.log(res);
      //   setCurrentPrice(newPrice);
      // });
    } catch (error) {
      console.error("Error bidding:", error);
    }
  };

  const handleLike = async () => {
    console.log("clicking", product._id);
    const authToken = await getUserToken();
    try {
      if (liked) {
        await unlikePost(product?._id, authToken);
        setLiked(false);
      } else {
        await likePost(product?._id, authToken);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  // const handleLikePosts = async (id: number) => {
  //   try {
  //     const res = await likePost(id);
  //     console.log("deleting :::", res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Animated.View
          entering={FadeIn.delay(500)}
          style={[styles.iconButtonContainer, styles.backButton, { top: 0 }]}
        >
          <IconButton
            testID="productDetailBackButton"
            icon="chevron-left"
            onPress={() => navigation.goBack()}
            iconColor="black"
            size="big"
            style={{ backgroundColor: Colors.main_white }}
          />

          {/* <Animated.View
        entering={FadeIn.delay(500)}
        style={[
          styles.iconButtonContainer,
          styles.heartButton,
          { top: insets.top + 20 },
        ]}
      >
        <IconButton
          onPress={handleLike}
          icon="heart"
          iconFamily="MaterialCommunityIcons"
          iconColor={liked ? "red" : "grey"}
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </Animated.View> */}
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
          <View style={styles.colorAndQuantity}>
            {/* <ColorPicker /> */}

            {/* <QuantitySelector amount={amount} setAmount={setAmount} /> */}
          </View>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.price}>Starting Price: ${currentPrice}</Text>
              <View style={styles.line} />

              {previousBids?.length === 0 ? (
                <View />
              ) : (
                <View style={styles.currentBidCont}>
                  <Text style={[styles.description, { fontWeight: "600" }]}>
                    Current bid:
                  </Text>
                  <Text style={[styles.description, { fontWeight: "600" }]}>
                    {lastAmount}$
                  </Text>
                </View>
              )}

              <Text style={styles.nextBid}>
                Next bid will be:{" "}
                {previousBids?.length === 0
                  ? currentPrice + 50
                  : lastAmount + 50}
                $
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
        <MainModal
          visible={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          onPress={() => {
            handleBid(), setIsOpenModal(false);
          }}
          title="Are you sure you want to place this bid?"
        />
      </ScrollView>
    </SafeAreaView>
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
    margin: 5,
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
