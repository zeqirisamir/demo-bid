import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/AuthReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  deletePost,
  getPosts,
  getUserPost,
} from "../../actions/posts/postsActions";
import { useNavigation } from "@react-navigation/native";
import {
  DashboardNavigationProp,
  HomeNavigationProp,
  Product,
} from "../../navigaton/Types";
import Post from "../../components/post/Post";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";
import ProductCard from "../../components/products/ProductCard";
import { handleLogout } from "../../data/constants";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<DashboardNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [post, setPost] = useState<Product[]>();

  console.log("useeeer", user);

  useEffect(() => {
    console.log("postts");
    handleGetPosts();
  }, []);

  const handleGetPosts = async () => {
    try {
      const res = await getUserPost(user?._id);
      setPost(res?.data?.data);
      console.log("from ni", res);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handledeletePosts = async (id: string) => {
    try {
      const res = await deletePost(id);
      console.log("deleting :::", res);
      handleGetPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title={"Home"}
        rightButtonText="Create a Post"
        showCancelBtn={true}
        leftButtonText="LogOut"
        handleBackBtn={() => handleLogout(dispatch)}
        handleRightBtn={() => navigation.navigate("CreatePostScreen")}
        containerStyle={{ innerHeight: 20 }}
      />
      <View>
        <Text style={styles.titleText}>Active Posts</Text>
      </View>
      <ScrollView style={styles.container}>
        {post?.map((post, key) => (
          <Post
            key={`post-${key}`}
            product={post}
            onDeletePress={handledeletePosts}
            isSeller={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingRight: 20,
  },
  titleText: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    color: Colors.black_txt,
    marginBottom: 5,
    textAlign: "center",
  },
});
