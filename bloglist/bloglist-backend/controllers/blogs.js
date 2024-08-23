const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");
// const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
// tehtävä 4.20
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate("comments", { content: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments", {
    content: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!body.title || !body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: typeof body.likes !== "undefined" ? body.likes : 0,
      user: user._id,
    });

    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    newBlog.user = user;
    response.status(201).json(newBlog);
  }
});

blogsRouter.post(
  "/:id/comments",
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    if (!body.content) {
      response.status(400).end();
    } else {
      const comment = new Comment({
        content: body.content,
        blog: request.params.id,
      });
      const newComment = await comment.save();
      const blog = await Blog.findById(request.params.id);
      blog.comments = blog.comments.concat(newComment._id);
      await blog.save();
      response.status(201).json(newComment);
    }
  },
);

blogsRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    blog.comments.map(
      async (comment) => await Comment.findByIdAndDelete(comment),
    );

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      user.blogs = user.blogs.filter(
        (userblog) => userblog._id.toString() !== blog._id.toString(),
      );
      await user.save();
      response.status(204).end();
    } else {
      return response.status(401).json({
        error: "wrong user: only the user who added the blog can delete it",
      });
    }
  },
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: typeof body.likes !== "undefined" ? body.likes : 0,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
