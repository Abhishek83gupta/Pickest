const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection.STATES.connected) return console.log("Database Connected");
  if (connection.STATES.disconnected)
    return console.log("Database Disconnected");
};


// const connectDB = async () => {
//   try {
//       const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
//       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//   } catch (error) {
//       console.log("MONGODB connection FAILED ", error);
//       process.exit(1)
//   }
// }


// const connectDB = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MERN_JOB_SEEKING_WEBAPP",
//     })
//     .then(() => {
//       console.log("Connected to database.");
//     })
//     .catch((err) => {
//       console.log(`Some Error occured. ${err}`);
//     });
// };

module.exports = { connectDB };