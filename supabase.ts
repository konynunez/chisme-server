// Import Dotenv
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import Axios
import axios, { AxiosInstance } from "axios";

// Create an Axios instance for Supabase
const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.SUPABASE_URL}/rest/v1`,
  timeout: 1000,
  headers: {
    apikey: process.env.SUPABASE_KEY as string,
    Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  },
});

export default instance;
