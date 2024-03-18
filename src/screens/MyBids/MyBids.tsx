import React, { useEffect } from "react";
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
import { getPosts } from "../../actions/posts/postsActions";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../navigaton/Types";
import Post from "../../components/post/Post";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";

const MyBids = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.userType);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const myPosts = posts?.filter(
    (item: { userName: any }) => item?.userName === user?.name
  );

  console.log(user);

  useEffect(() => {
    console.log("postts", posts);
    handleGetPosts();
  }, []);

  const handleGetPosts = async () => {
    try {
      const res = await getPosts();
      console.log("from ni", res);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title={"Home"}
        showBackBtn={false}
        containerStyle={{ paddingHorizontal: 15, borderBottomWidth: 0 }}
      />

      <ScrollView>
        {myPosts?.map(
          (post: {
            _id: any;
            description: string;
            duration: string;
            productName: string;
            imgSrc: string;
            startingBid: number;
          }) => (
            <Post
              _id={post._id}
              description={post.description}
              duration={post.duration}
              productName={post.productName}
              image={post.imgSrc}
              startingBid={post.startingBid}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default MyBids;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
