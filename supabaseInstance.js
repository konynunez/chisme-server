require("dotenv").config();
const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.SUPABASE_URL + "/rest/v1",
  timeout: 5000, // Increased timeout for larger or delayed responses
  headers: {
    apikey: process.env.SUPABASE_KEY,
    Authorization: "Bearer " + process.env.SUPABASE_KEY,
  },
});

// Optional: Add interceptors for better error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request error:", error.message);
    return Promise.reject(error);
  }
);

module.exports = instance;
