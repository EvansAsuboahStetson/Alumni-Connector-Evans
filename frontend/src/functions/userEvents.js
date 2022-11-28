const axios = require("axios");
const { constants } = require("../constants");

// Function to get all user events
export const getUserEvents = async (userId, token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}/events`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFollowerEvents = async (token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.FOLLOWEREVENTS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPosts = async (token,user_ids) => {
  return axios({
    method: "post",
    data:user_ids,
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.FOLLOWERPOSTS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to update user event
export const updateUserEvent = async (userId, eventId, data, token) => {
  return axios({
    method: "patch",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}/events/${eventId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to delete user event
export const deleteUserEvent = async (userId, eventId, token) => {
  return axios({
    method: "delete",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}/events/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to create user event
export const createUserEvent = async (userId, data, token) => {
  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.USERS}/${userId}/events`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
