import React, { useEffect, useState } from "react";
import { getFollowerPosts } from "../../functions/userPosts";
import { findFriends } from "../../functions/users";
import PostCard from "./PostCard";

function PostCardWrapper() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await getFollowerPosts(token);
  
        console.log(response.data);

        // Call getAllUsers and pass the updated posts data as a parameter
        getAllUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllUsers = async (updatedPosts) => {
      console.log(updatedPosts)
      try {
        const data = {
          dada: updatedPosts
        };
        const response = await findFriends(token, data);
        setPosts(response.data);

        console.log("RIRI",response);
      } catch (err) {
        console.log(err);
      }
    };

    getAllPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostCardWrapper;
