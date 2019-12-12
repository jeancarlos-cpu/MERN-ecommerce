import mongoose from "mongoose";

const connection = {};

const connectDb = async () => {
  if (connection.isConnected) {
    console.log("using existing connection");
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("db is connected!");
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;
