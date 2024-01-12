import axios from "axios";
import Post from "../Post";
import { useEffect, useState } from "react";

export interface PostProps {
  _id: string;
  author: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: string;
  summary: string;
  cover: string;
  title: string;
  updatedAt: string;
  __v: number;
}

const HomePage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3334/post").then((response) => {
      setPosts(response.data);
      console.log(typeof response.data[0].title);
    });
  }, []);

  return (
    <div className="container mx-auto grid">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default HomePage;
