import { useRef } from "react";
import { useSelector } from "react-redux";
import Bloglist from "./Bloglist";
import Togglable from "./Togglable";
import Newblogform from "./Newblogform";
import LoginForm from "./Loginform";
// import { initializeBlogs } from "../reducers/blogreducer";
// import { initializeUser } from "../reducers/userreducer";

const Home = () => {
  const blogFormRef = useRef();

  const user = useSelector((state) => state.user);

  if (user === null) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <Newblogform />
        </Togglable>
        <br></br>
      </div>
      <Bloglist />
    </div>
  );
};

export default Home;

// old version
// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Blog from "./Blog";
// import Notification from "./Notification";
// import Togglable from "./Togglable";
// import Newblogform from "./Newblogform";
// import LoginForm from "./Loginform";
// import { initializeBlogs } from "../reducers/blogreducer";
// import { initializeUser } from "../reducers/userreducer";
// import { removeUser } from "../reducers/userreducer";
// import { setNotification } from "../reducers/notificationreducer";

// const Home = () => {
//   const blogFormRef = useRef();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(initializeBlogs());
//   }, []);

//   const blogs = useSelector((state) => state.blogs);

//   useEffect(() => {
//     dispatch(initializeUser());
//   }, []);

//   const user = useSelector((state) => state.user);

//   const logOut = () => {
//     dispatch(removeUser());
//     dispatch(setNotification({ data: "logged out", type: "info" }, 3000));
//   };

//   if (user === null) {
//     return (
//       <div>
//         <h2>Log in to application</h2>
//         <Notification />
//         <LoginForm />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>blogs</h2>
//       <Notification />
//       <div>
//         <p>
//           {user.name} logged in <button onClick={logOut}>log out</button>
//         </p>
//       </div>
//       <div>
//         <Togglable buttonLabel="create new blog" ref={blogFormRef}>
//           <Newblogform />
//         </Togglable>
//         <br></br>
//       </div>
//       {blogs.map((blog) => (
//         <Blog key={blog.id} blog={blog} />
//       ))}
//     </div>
//   );
// };

// export default Home;
