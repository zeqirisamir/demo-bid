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
  getAllPersonalBiddings,
  getPosts,
} from "../../actions/posts/postsActions";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp, Product } from "../../navigaton/Types";
import Post from "../../components/post/Post";
import Header from "../../components/header/Header";
import { Colors } from "../../theme/Colors";

const MyBids = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProp["navigation"]>();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const [allBids, setAllBids] = useState([]);

  console.log(user);

  useEffect(() => {
    handleGetPersonalBids();
  }, []);

  const handleGetPersonalBids = async () => {
    try {
      const res = await getAllPersonalBiddings(user?._id);
      console.log("get my bids", res);
      const uniquePostIds = new Set<string>();
      const filteredBids = res?.data?.data?.filter(
        (bid: { post: { _id: string } }) => {
          if (!uniquePostIds.has(bid.post._id)) {
            uniquePostIds.add(bid.post._id);
            return true;
          }
          return false;
        }
      );
      console.log("filtered", filteredBids);

      setAllBids(filteredBids);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title={"My Bids"}
        leftButtonText="Back"
        showCancelBtn
        handleBackBtn={() => navigation.goBack()}
        containerStyle={{ paddingHorizontal: 15, borderBottomWidth: 0 }}
      />

      <ScrollView style={styles.container}>
        {allBids?.map((post: Product, key: number) => (
          <Post product={post?.post} isSeller={false} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyBids;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.main_white,
  },
  container: {
    paddingRight: 20,
    marginTop: 10,
  },
});
