import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
// import { setNotification } from "./notificationreducer";

const sortBlogs = (a, b) => {
  return b.likes - a.likes;
};

const initialState = [];
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
      return state.sort(sortBlogs);
    },
    setBlogs(state, action) {
      const sorted = action.payload.sort(sortBlogs);
      return sorted;
    },
    likeBlogAction(state, action) {
      const likedBlog = action.payload;
      // console.log(JSON.parse(JSON.stringify(state)));
      // state.map((blog) => console.log(JSON.parse(JSON.stringify(blog))));
      const updated = state.map((blog) =>
        blog.id !== likedBlog.id ? blog : { ...blog, likes: likedBlog.likes },
      );
      return updated.sort(sortBlogs);
    },
    commentBlogAction(state, action) {
      const commentedBlog = action.payload;
      const commented = state.map((blog) =>
        // console.log(blog)
        blog.id !== commentedBlog.blog
          ? blog
          : { ...blog, comments: blog.comments.concat(commentedBlog) },
      );
      return commented.sort(sortBlogs);
    },
    removeBlogAction(state, action) {
      const id = action.payload;
      const updated = state.filter((blog) => blog.id !== id);
      return updated.sort(sortBlogs);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const {
  appendBlog,
  setBlogs,
  likeBlogAction,
  commentBlogAction,
  removeBlogAction,
} = blogSlice.actions;

export const createNewBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const data = await blogService.update(blogObject);
    dispatch(likeBlogAction(data));
  };
};

export const commentBlog = (commentObject) => {
  return async (dispatch) => {
    const data = await blogService.comment(commentObject);
    dispatch(commentBlogAction(data));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    if (
      window.confirm(
        `Remove blog ${blogs.find((blog) => blog.id === id).title} by ${blogs.find((blog) => blog.id === id).author}`,
      )
    ) {
      await blogService.remove(id);
      dispatch(removeBlogAction(id));
      // dispatch(
      //   setNotification(
      //     {
      //       data: `Blog deleted!`,
      //       type: "info",
      //     },
      //     3000,
      //   ),
      // );
    }
  };
};

export default blogSlice.reducer;
