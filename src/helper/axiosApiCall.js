import axios from "axios";
import { getAdditionalHeaders } from "./getAdditionalHeaders";
import { getToken } from "./getToken";

export const axiosApiCall = {
  Post: async (baseUrl, params, type) => {
    try {
      const url = baseUrl;
      const headers = await getAdditionalHeaders(url);

      const response = await axios.post(url, params, {
        method: type,
        headers: {
          ...headers,
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in POST request:", error.message);
    }
  },
  Get: async (baseUrl) => {
    try {
      const url = baseUrl;
      const additionalheaders = await getAdditionalHeaders(url);
      const response = await axios.get(url, {
        headers: {
          ...additionalheaders,
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
};
