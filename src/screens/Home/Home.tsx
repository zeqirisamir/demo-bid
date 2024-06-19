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

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const insets = useSafeAreaInsets();
  const [filteredPosts, setFilteredPosts] = useState<Product[]>(posts);

  useEffect(() => {
    handleGetPosts();
    onSelectTag(null);
  }, []);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      dispatch(setPosts(res.data));
      //console.log("data", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledeletePosts = async (id: number) => {
    try {
      const res = await deletePost(id);
      console.log("deleting :::", res);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <View style={styles.screen}>
      <Header
        title={"Home"}
        showBackBtn={true}
        containerStyle={{ borderBottomWidth: 0 }}
        showSummary
        showLeftIcon
        handleBackBtn={() => navigation.navigate("ProfileMenu")}
        handleRightBtn={() => navigation.navigate("Settings")}
      />

      <Animated.View style={[styles.container, { paddingTop: insets.bottom }]}>
        <ScrollView contentContainerStyle={styles.content}>
          <FilterChips onSelectTag={onSelectTag} />
          {Array.isArray(filteredPosts) &&
            filteredPosts.map((item: Product, key: any) => (
              <ProductCard
                tag={`image_${item?._id}`}
                onPressCard={() => handleCardPress(item)}
                key={`product-${key}`}
                product={item}
                onPress2Card={(id) => handledeletePosts(id)}
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
  },
  noPostsText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});
