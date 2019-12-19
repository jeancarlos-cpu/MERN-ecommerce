import mongoose from "mongoose";

async function connectDb() {
  const options = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  if (mongoose.connections && mongoose.connections[0]) {
    if (mongoose.connections[0].readyState) {
      return;
    }
  }

  await mongoose.connect(process.env.MONGO_DOCKER_URI, options);
}

export default connectDb;
