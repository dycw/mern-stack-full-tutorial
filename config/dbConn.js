import { connect } from "mongoose";

export default async function connectDB() {
  try {
    await connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(error);
  }
}
