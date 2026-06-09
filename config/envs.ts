import dotenv from "dotenv";

dotenv.config();

export const LOGIN_USERNAME = process.env.LOGIN_USERNAME ?? "";
export const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD ?? "";
export const LOGIN_URL = process.env.LOGIN_URL ?? "";