import React, { useEffect, useState } from "react";
import { GETMUTUALSANDFRIENDS, getFollowerPosts } from "../../functions/userPosts";
import { findFriends, getUserId } from "../../functions/users";
import PostCard from "./PostCard";

function PostCardWrapper() {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [LoggedInuser,setUser] = useState()

  useEffect(() => {
    // const getAllPosts = async () => {

    //   try {
        
    //   const userResponse = await getUserId(token)
    //   console.log(userResponse?.data)
    //   setUser(userResponse?.data)
    //     const response = await getFollowerPosts(token);
  
    //     console.log(response.data);

    //     // Call getAllUsers and pass the updated posts data as a parameter
    //     getAllUsers(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const getAllUsers = async (updatedPosts) => {
    //   console.log(updatedPosts)
    //   try {
    //     const data = {
    //       dada: updatedPosts
    //     };
    //     const response = await findFriends(token, data);
    //     setPosts(response.data);

    //     console.log("RIRI",response);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    const getMutualFriends= async()=>{
      try{

        const userResponse = await getUserId(token)
        console.log(userResponse?.data)
        setUser(userResponse?.data)
        
        // console.log(token)
        const response = await GETMUTUALSANDFRIENDS(token)
        setPosts(response.data)

      }
      catch(err)
      {
        console.log(err)

      }
      

    }

    // getAllPosts();
    getMutualFriends()
  }, []);

  useEffect(()=>{
   
    
  },[])

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} LoggedInuser={LoggedInuser} />
      ))}
    </div>
  );
}

export default PostCardWrapper;
