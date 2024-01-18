import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface IPost {
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

export interface IPostState {
  posts: {
    items: IPost[];
    status: "loading" | "loaded" | "error";
  };
}

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axios.get<IPost[]>("/post");

  return data;
});

const initialState: IPostState = {
  posts: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    });
  },
});

export const postReducer = postSlice.reducer;
