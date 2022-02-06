import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const mongoURI = process.env.MONGO_URI || "";
export const nodeEnv = process.env.NODE_ENV || "development";
