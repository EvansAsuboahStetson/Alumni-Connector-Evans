const axios = require("axios");
const { constants } = require("../constants");

// Function to authenticate user
export const login = async (data) => {
  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.LOGIN}`,
    data: data,
  });
};

// Function to register user
export const signup = async (data) => {
  return axios({
    method: "post",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.SIGNUP}`,
    data: data,
  });
};
