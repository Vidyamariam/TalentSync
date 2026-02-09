import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT as string,
  DB_URL: process.env.DB_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY as string,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY as string,
  STREAM_API_KEY: process.env.STREAM_API_KEY as string,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET as string,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY as string,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY as string,
};
