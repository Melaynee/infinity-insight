import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/postSlice";
import { AppDispatch } from "../redux/store";

const useFetchPosts = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
};

export default useFetchPosts;
