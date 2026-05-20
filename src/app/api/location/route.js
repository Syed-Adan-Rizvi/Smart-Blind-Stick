// src/app/api/location/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tracking from "@/models/Tracking";

// ================= POST API (For ESP32 Hardware) =================
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { latitude, longitude, sos } = body;

    let message = sos ? "I NEED HELP!" : "SAFE";

    // 1. Purana data delete karne se pehle check karo ky website se "Safe" ki request tou nahi aayi?
    const oldData = await Tracking.findOne();
    let sendSafeCommand = false;

    if (oldData && oldData.reset_requested === true) {
      sendSafeCommand = true; // Family ne button daba diya hai!
    }

    // 2. Ab purana data delete karo
    await Tracking.deleteMany();

    // 3. Naya data save karo. (Agar family ne safe kaha hai, tou jabran false save karo)
    const trackingData = await Tracking.create({
      latitude,
      longitude,
      sos: sendSafeCommand ? false : sos, 
      message: sendSafeCommand ? "SAFE" : message,
      reset_requested: false // Flag wapas gira do taake loop na banay
    });

    // 4. ESP32 ko response bhejo. Agar sendSafeCommand true hai, tou ESP32 chup ho jayega!
    return NextResponse.json({
      success: true,
      message: "Location Saved",
      safe: sendSafeCommand, // <-- ESP32 isay parh kar SOS band karega
      data: trackingData
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}

// ================= GET API (For Website Map/Dashboard) =================
export async function GET() {
  try {
    await connectDB();
    const trackingData = await Tracking.findOne();

    if (!trackingData) {
      return NextResponse.json({ success: false, message: "No Tracking Data Found" });
    }

    return NextResponse.json({ success: true, data: trackingData });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}

// ================= PATCH API (For Website "Mark as Safe" Button) =================
export async function PATCH() {
  try {
    await connectDB();
    
    // Database mein reset_requested ko true kar do. 
    // Jab ESP32 agla data bhejega tou usay {"safe": true} mil jayega.
    await Tracking.updateMany({}, { 
      $set: { 
        reset_requested: true,
        sos: false,
        message: "SAFE"
      } 
    });

    return NextResponse.json({ 
      success: true, 
      message: "Safe command sent to hardware!" 
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Server Error" });
  }
}














// // src/app.api/location/route.js

// // Import NextResponse
// import { NextResponse } from "next/server";

// // Import Database Connection
// import connectDB from "@/lib/mongodb";

// // Import Tracking Model
// import Tracking from "@/models/Tracking";


// // ================= POST API =================
// export async function POST(request) {

//   try {

//     // Connect Database
//     await connectDB();

//     // Get JSON Data From Request
//     const body = await request.json();

//     // Extract Values
//     const {
//       latitude,
//       longitude,
//       sos
//     } = body;

//     // Create Dynamic Message
//     const message = sos
//       ? "I NEED HELP!"
//       : "SAFE";

//     // Remove Old Tracking Data
//     // Only latest live location will remain
//     await Tracking.deleteMany();

//     // Save New Tracking Data
//     const trackingData = await Tracking.create({

//       latitude,
//       longitude,
//       sos,
//       message

//     });

//     // Return Success Response
//     return NextResponse.json({

//       success: true,
//       message: "Location Saved Successfully",
//       data: trackingData

//     });

//   } catch (error) {

//     console.log(error);

//     // Return Error Response
//     return NextResponse.json({

//       success: false,
//       message: "Server Error"

//     });

//   }

// }

// // ================= GET API =================
// export async function GET() {

//   try {

//     // Connect Database
//     await connectDB();

//     // Get Latest Tracking Data
//     const trackingData = await Tracking.findOne();

//     // If No Data Found
//     if (!trackingData) {

//       return NextResponse.json({

//         success: false,
//         message: "No Tracking Data Found"

//       });

//     }

//     // Return Success Response
//     return NextResponse.json({

//       success: true,
//       data: trackingData

//     });

//   } catch (error) {

//     console.log(error);

//     // Return Error Response
//     return NextResponse.json({

//       success: false,
//       message: "Server Error"

//     });

//   }

// }