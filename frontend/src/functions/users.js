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
export const getMatches = async ( token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.MATCHES}`,
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
