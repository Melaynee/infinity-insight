import axios from "axios";
import Post from "../Post";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3334/post").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto grid">
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </div>
  );
};

export default HomePage;
