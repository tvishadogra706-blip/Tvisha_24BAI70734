import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      content: "Instagram Post",
      platform: "Instagram",
      date: "2026-08-20"
    },
    {
      id: 2,
      content: "Facebook Post",
      platform: "Facebook",
      date: "2026-08-21"
    }
  ]
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        post => post.id !== action.payload
      );
    }
  }
});

export const { addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;