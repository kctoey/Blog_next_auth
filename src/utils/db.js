import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user123:user123@cluster0.xntnb31.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
