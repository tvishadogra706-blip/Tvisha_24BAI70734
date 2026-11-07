import { useSelector, useDispatch } from "react-redux";
import { addPost } from "./store/postsSlice";

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const addNewPost = () => {
    dispatch(
      addPost({
        id: Date.now(),
        title: "New Post",
        platform: "Instagram",
        date: "2026-08-20",
      })
    );
  };

  return (
    <div>
      <h1>Social Media Calendar</h1>

      <button onClick={addNewPost}>Add Post</button>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>Platform: {post.platform}</p>
          <p>Date: {post.date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;