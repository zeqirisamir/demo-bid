import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { RootState } from "../../redux/store";
import { deletePost, getPosts } from "../../actions/posts/postsActions";
import { HomeNavigationProp, Product } from "../../navigaton/Types";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import { setPosts } from "../../redux/posts/postsReducer";
import ProductCard from "../../components/products/ProductCard";
import FilterChips from "../../components/products/FilterChips";
import { SCREEN_HEIGHT } from "../../constants/Screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const insets = useSafeAreaInsets();
  const [filteredPosts, setFilteredPosts] = useState<Product[]>(posts);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      console.log("post data", res);

      dispatch(setPosts(res.data));
      setFilteredPosts(res?.data);
      //console.log("data", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const getTokenFromStorage = async () => {
  //   try {
  //     const previousUserData = await AsyncStorage.getItem("userData");
  //     if (previousUserData) {
  //       console.log("previos data", previousUserData);

  //       const userData = JSON.parse(previousUserData);
  //       console.log(userData);
  //     }
  //     const token = await AsyncStorage.getItem("userData");
  //     return token;
  //   } catch (error) {
  //     console.error("Error retrieving token from AsyncStorage:", error);
  //     return null;
  //   }
  // };
  // getTokenFromStorage();
  const handleCardPress = (product: Product) => {
    navigation.navigate("PostDetails", {
      product: product,
    });
  };

  const onSelectTag = useCallback(
    (selectedTag: string | null) => {
      if (selectedTag) {
        const filtered = posts?.filter(
          (post: Product) => post.category === selectedTag
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(posts);
      }
    },
    [posts]
  );
  useEffect(() => {
    handleGetPosts();
    console.log("filtered", filteredPosts);
    console.log("posts", posts);

    //onSelectTag(null);
  }, []);
  return (
    <View style={styles.screen}>
      <Header
        title={"Home"}
        showBackBtn={true}
        containerStyle={{ borderBottomWidth: 0 }}
        showSummary
        showLeftIcon
        showSettingsBtn
        handleBackBtn={() => navigation.navigate("ProfileMenu")}
        handleRightBtn={() => navigation.navigate("MyBids")}
      />

      <Animated.View style={[styles.container, { marginTop: insets.bottom }]}>
        <FilterChips onSelectTag={onSelectTag} />
        <ScrollView contentContainerStyle={styles.content}>
          {filteredPosts.length > 0 &&
            filteredPosts.map((item: Product, key: any) => (
              <ProductCard
                tag={`image_${item?._id}`}
                onPressCard={() => handleCardPress(item)}
                key={`product-${key}`}
                product={item}
                onPress2Card={(id) => {}}
              />
            ))}
          {Array.isArray(filteredPosts) && filteredPosts.length === 0 && (
            <Text style={styles.noPostsText}>
              There are no posts from this category
            </Text>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main_white,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 5,
    paddingBottom: SCREEN_HEIGHT / 4,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  noPostsText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});
