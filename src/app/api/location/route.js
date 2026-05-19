// Import NextResponse
import { NextResponse } from "next/server";

// Import Database Connection
import connectDB from "@/lib/mongodb";

// Import Tracking Model
import Tracking from "@/models/Tracking";


// ================= POST API =================
export async function POST(request) {

  try {

    // Connect Database
    await connectDB();

    // Get JSON Data From Request
    const body = await request.json();

    // Extract Values
    const {
      latitude,
      longitude,
      sos
    } = body;

    // Create Dynamic Message
    const message = sos
      ? "I NEED HELP!"
      : "SAFE";

    // Remove Old Tracking Data
    // Only latest live location will remain
    await Tracking.deleteMany();

    // Save New Tracking Data
    const trackingData = await Tracking.create({

      latitude,
      longitude,
      sos,
      message

    });

    // Return Success Response
    return NextResponse.json({

      success: true,
      message: "Location Saved Successfully",
      data: trackingData

    });

  } catch (error) {

    console.log(error);

    // Return Error Response
    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}

// ================= GET API =================
export async function GET() {

  try {

    // Connect Database
    await connectDB();

    // Get Latest Tracking Data
    const trackingData = await Tracking.findOne();

    // If No Data Found
    if (!trackingData) {

      return NextResponse.json({

        success: false,
        message: "No Tracking Data Found"

      });

    }

    // Return Success Response
    return NextResponse.json({

      success: true,
      data: trackingData

    });

  } catch (error) {

    console.log(error);

    // Return Error Response
    return NextResponse.json({

      success: false,
      message: "Server Error"

    });

  }

}