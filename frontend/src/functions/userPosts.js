const axios = require("axios");
const { constants } = require("../constants");

export const getFollowerPosts = async (token) => {
  // console.log("yuyu",token)
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GETMUTUALSANDFRIENDS = async (token)=>{
  console.log("This",token)

  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}${constants.API.ENDPOINTS.GETFRIENDSMUTUALS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Function to create a post for a user
export const createUserPost = async (data, token) => {
  console.log(data);
  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}/createPost`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to update a user's post
export const updateUserPost = async (data, token) => {
  return axios({
    method: "patch",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}${constants.API.ENDPOINTS.UPDATECOMMENTS}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const PostReply = async (data,token)=>{

  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}${constants.API.ENDPOINTS.POSTREPLY}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
}

export const GETLIKEPOST = async (data,token)=>{

  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}${constants.API.ENDPOINTS.GETLIKEPOST}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
}



export const LikePost = async (data,token)=>{
  console.log(data)
  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.POSTS}${constants.API.ENDPOINTS.LIKEPOST}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
}

// Function to delete a user's post
export const deleteUserPost = async (userId, postId, token) => {
  return axios({
    method: "delete",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
