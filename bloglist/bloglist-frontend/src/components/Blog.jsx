import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import { likeBlog } from "../reducers/blogreducer";
import { removeBlog } from "../reducers/blogreducer";
import { commentBlog } from "../reducers/blogreducer";
import { Button, Input } from "./Styles.jsx";
import { setNotification } from "../reducers/notificationreducer";

const Blog = ({ blog }) => {
  if (!blog) {
    return null;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const updateBlog = () => {
    dispatch(
      likeBlog({
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        id: blog.id,
      }),
    );
  };

  const comment = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    dispatch(
      commentBlog({
        content: content,
        blog: blog.id,
      }),
    );
  };

  const remove = async (id) => {
    await dispatch(removeBlog(id));
    await dispatch(
      setNotification(
        {
          data: `Blog deleted!`,
          type: "info",
        },
        3000,
      ),
    );
    navigate("/");
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <p>
        likes: {blog.likes}{" "}
        <Button
          onClick={() => {
            updateBlog();
          }}
        >
          like
        </Button>
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.name === user.name ? (
        <p>
          <Button
            onClick={() => {
              remove(blog.id);
            }}
          >
            remove
          </Button>
        </p>
      ) : null}
      <h3>comments</h3>
      {/* <button onClick={console.log("testi")}>add comment</button> */}
      <form onSubmit={comment}>
        <Input name="content" />
        <Button type="submit">add comment</Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

// old version

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import PropTypes from "prop-types";
// import { likeBlog } from "../reducers/blogreducer";
// import { removeBlog } from "../reducers/blogreducer";
// import { setNotification } from "../reducers/notificationreducer";

// const Blog = ({ blog }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);

//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: "solid",
//     borderWidth: 1,
//     marginBottom: 5,
//   };

//   const updateBlog = () => {
//     dispatch(
//       likeBlog({
//         author: blog.author,
//         title: blog.title,
//         url: blog.url,
//         likes: blog.likes + 1,
//         id: blog.id,
//       }),
//     );
//   };

//   const remove = async (id) => {
//     await dispatch(removeBlog(id));
//     dispatch(
//       setNotification(
//         {
//           data: `Blog deleted!`,
//           type: "info",
//         },
//         3000,
//       ),
//     );
//   };

//   const [details, setDetails] = useState(false);
//   const hideWhenDetails = { display: details ? "none" : "" };
//   const showWhenDetails = { display: details ? "" : "none" };

//   return (
//     <div>
//       <div style={{ ...hideWhenDetails, ...blogStyle }} className="notexpanded">
//         <p>
//           {blog.title} {blog.author}{" "}
//           <button onClick={() => setDetails(true)}>view</button>
//         </p>
//       </div>
//       <div style={{ ...showWhenDetails, ...blogStyle }} className="expanded">
//         <p>
//           {blog.title} {blog.author}{" "}
//           <button onClick={() => setDetails(false)}>hide</button>
//         </p>
//         <p>{blog.url}</p>
//         <p>
//           likes: {blog.likes}{" "}
//           <button
//             onClick={() => {
//               updateBlog();
//             }}
//           >
//             like
//           </button>
//         </p>
//         <p>{blog.user.name}</p>
//         {blog.user.name === user.name ? (
//           <p>
//             <button
//               onClick={() => {
//                 remove(blog.id);
//               }}
//             >
//               remove
//             </button>
//           </p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Blog;
