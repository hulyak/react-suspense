import { Suspense } from "react";
import ReactDOM from "react-dom";
import { fetchData } from "./Api";

// return the resource
const resource = fetchData();

const App = () => {
  return (
    <>
      <Suspense fallback={<h2>Loading</h2>}>
        <ProfileDetails />
        <ProfilePosts />
      </Suspense>
    </>
  );
};

// component that renders the profile
const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <ul>
      <li>Username: {user.username}</li>
      <li>Email: {user.email}</li>
      <li>City: {user.address.city}</li>
    </ul>
  );
};

const ProfilePosts = () => {
  const posts = resource.posts.read();
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <strong>Latests Posts</strong>
      </li>
      {posts.map((post) => (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
