// // src/lib/db.js
// import mongoose from "mongoose";

// export  const connectDB = async () => {
//   // Agar pehle se connected hai, toh dobara connect mat karo
//   if (mongoose.connection.readyState >= 1) return;

//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("✅ MongoDB Connected Makhan Ki Tarhan!");
//   } catch (error) {
//     console.error("🚨 MongoDB Connection Failed:", error);
//   }
// };








import mongoose from "mongoose";

const connectDB = async () => {
  try {

    // Already Connected
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB Already Connected");
      return;
    }

    // Connect with timeout options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB Connected Successfully");

  } catch (error) {
    console.log("MongoDB Connection Error");
    console.log(error);
    throw new Error("Database Connection Failed");
  }
};

export default connectDB;