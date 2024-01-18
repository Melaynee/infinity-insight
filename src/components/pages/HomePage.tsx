import Post from "../Post";
import { useSelector } from "react-redux";
import { IPost } from "../redux/slices/postSlice";
import { PostLoadingSkeleton } from "../PostLoadingSkeleton";
import { RootState } from "../redux/store";
import useFetchPosts from "../hooks/useFetchPosts";

const HomePage = () => {
  useFetchPosts();
  const { posts } = useSelector((state: RootState) => state.posts);

  const isLoading = posts.status === "loading";

  return (
    <div className="container mx-auto grid">
      {isLoading
        ? Array.from({ length: 5 }, (_, index) => (
            <PostLoadingSkeleton key={index} />
          ))
        : posts.items.map((post: IPost) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default HomePage;
