import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: "solid",
//   borderWidth: 1,
//   marginBottom: 5,
// };

// const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1
//   }

const BlogObject = ({ className, blog }) => {
  return (
    <div className={className}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

const StyledBlogObject = styled(BlogObject)`
  background: #f6e0bf;
  font-size: 1em;
  margin: 0.5em 0.1em;
  padding: 0.25em 0.75em;
  border: none;
  border-radius: 3px;
`;

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  // console.log(blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <StyledBlogObject key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
