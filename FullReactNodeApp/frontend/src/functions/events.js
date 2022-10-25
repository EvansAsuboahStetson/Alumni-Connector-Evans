const axios = require("axios");
const { constants } = require("../constants");

// Function to get all events
export const getEvents = async (token) => {
  return axios({
    method: "get",
    url: `${constants.API.BASE_URL}${constants.API.ENDPOINTS.EVENTS}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
