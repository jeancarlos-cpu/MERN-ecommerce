import mongoose from "mongoose";

const connection = {};

const connectDb = async () => {
  // using existing connection
  if (connection.isConnected) {
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
    console.error(e);
  }
};

export default connectDb;
