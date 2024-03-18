import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/AuthReducer";
import { RootState } from "../../redux/store";
import { getPosts } from "../../actions/posts/postsActions";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, Product } from "../../navigaton/Types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Post from "../../components/post/Post";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import { setPosts } from "../../redux/posts/postsReducer";
import ProductCard from "../../components/products/ProductCard";
import ListHeader from "../../components/products/ListHeader";
import FilterChips from "../../components/products/FilterChips";
import { SCREEN_HEIGHT } from "../../constants/Screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CONTAINER_H_P = 20;
const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.userType);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const insets = useSafeAreaInsets();
  console.log(posts);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      dispatch(setPosts(res.data));
      console.log("from ni", res?.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("postts", posts);
    handleGetPosts();
  }, []);

  console.log("data:::::", posts);
  const handleCardPress = (product: Product) => {
    navigation.navigate("PostDetails", {
      product: product,
    });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      tag={`image_${item.id}`}
      onPressCard={() => handleCardPress(item)}
      key={item.id}
      product={item}
    />
  );
  return (
    <View style={styles.screen}>
      <Header
        title={"Home"}
        showBackBtn={false}
        containerStyle={{ paddingHorizontal: 15, borderBottomWidth: 0 }}
      />

      <Animated.View style={[styles.container, { paddingTop: insets.bottom }]}>
        <FlatList
          contentContainerStyle={styles.content}
          testID="productsFlatList"
          ListHeaderComponent={() => {
            return (
              <>
                <ListHeader />
                <FilterChips />
              </>
            );
          }}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 50,
    paddingHorizontal: 5,
    paddingBottom: SCREEN_HEIGHT / 4,
    justifyContent: "center",
  },
});
