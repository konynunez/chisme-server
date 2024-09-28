"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Dotenv
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Import Axios
const axios_1 = __importDefault(require("axios"));
// Create an Axios instance for Supabase
const instance = axios_1.default.create({
    baseURL: `${process.env.SUPABASE_URL}/rest/v1`,
    timeout: 1000,
    headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    },
});
// Export the Axios instance for use in other modules
exports.default = instance;
