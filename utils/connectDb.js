import mongoose from "mongoose";

const connection = {};

const connectDb = async () => {
  if (connection.isConnected) {
    console.log("using existing connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_DOCKER_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (e) {
    console.log(e);
  }
};

export default connectDb;
