// src/models/Tracking.js
import mongoose from "mongoose";

const TrackingSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  sos: Boolean,
  message: String,
  reset_requested: { type: Boolean, default: false } // <-- YEH NAYI LINE ADD KARNI HAI
});

export default mongoose.models.Tracking || mongoose.model("Tracking", TrackingSchema);












 // Import mongoose
// import mongoose from "mongoose";


// // Create Tracking Schema
// const trackingSchema = new mongoose.Schema({

//   // Latitude Value
//   latitude: {

//     type: Number,
//     required: true

//   },

//   // Longitude Value
//   longitude: {

//     type: Number,
//     required: true

//   },

//   // SOS Status
//   sos: {

//     type: Boolean,
//     default: false

//   },

//   // Message
//   message: {

//     type: String,
//     default: "SAFE"

//   },

//   // Last Updated Time
//   updatedAt: {

//     type: Date,
//     default: Date.now

//   }

// });


// // Prevent model overwrite issue in Next.js
// const Tracking =mongoose.models.Tracking ||mongoose.model("Tracking", trackingSchema);

// // console.log("Tracking Model Created");

// // Export Model
// export default Tracking;