const axios = require("axios");
const { constants } = require("../constants");

// Function to get all users
export const getUsers = async (token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getUserId = async (token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERBYID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getFriends = async (token,credentials) => {
  console.log(credentials)
  return axios({
    method: "post",
    data: credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.FRIENDS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const connectionRequest = async (token,credentials) => {
  return axios({
    method: "POST",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.CONNECTIONREQUEST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const pendingFriend = async (token,credentials) => {
 
  return axios({
    method: "POST",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.PENDINGEXIST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const sentRequest = async (token,credentials) => {
 
  return axios({
    method: "POST",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.SENTREQUEST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const isConnected = async (token,credentials) => {

  return axios({
    method: "POST",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.CONNECTIONEXIST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const acceptFriendRequest = async (token,credentials) => {


  return axios({
    method: "patch",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.ACCEPTFRIENDREQUEST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const deleteFriendRequest = async (token,credentials) => {

  return axios({
    method: "patch",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.DELETEFRIENDREQUEST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//user/namesOfPendingRequest
export const pendingFriendRequest = async (token) => {
  return axios({
    method: "GET",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.PENDDINGUSEREXIST}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};





export const pendingRequestNames = async (token,credentials) => {
  console.log(credentials)
  return axios({
    method: "post",
    data:credentials,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.FRIENDREUQESTNAMES}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




// Function to get user
export const getUser = async (userId, token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to match search results
export const getMatches = async ( token, credentials) => {
 
  return axios({
    method: "POST",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.MATCHES}`,
    data: credentials,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getFilter = async ( token, credentials) => {

  return axios({
    method: "POST",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.FILTER}`,
    data: credentials,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to update user
export const updateUser = async (userId, data, token) => {
  return axios({
    method: "patch",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to delete user
export const deleteUser = async (userId, token) => {
  return axios({
    method: "delete",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
