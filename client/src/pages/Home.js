import {useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
    const [error, setError] = useState("");
  const [posts, SetPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/crud/posts");
      console.log(response.data);
      SetPosts(response.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App" style={{ margin: "20px" }}>
      <Navbar />
      <Welcome />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 style={{ color: "red", marginTop: "20px", marginBottom: "20px" }}>
          {error}
        </h5>
        {posts.map((post) => {
          return (
            <Card
              key={post._id}
              id={post._id}
              title={post.title}
              author={post.author}
              body={post.body}
            />
          );
        })}
      </div>
    </div>
  
  )
}

export default Home