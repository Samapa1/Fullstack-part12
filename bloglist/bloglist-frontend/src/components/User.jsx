const User = ({user}) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {/* <div>{note.user}</div> */}
      <p>added blogs</p>
      <div>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
