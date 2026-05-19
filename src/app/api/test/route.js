// Import NextResponse
import { NextResponse } from "next/server";

// Import Database Function
import connectDB from "@/lib/mongodb";

// GET API
export async function GET() {

  // Connect Database
  await connectDB();

  // Return Response
  return NextResponse.json({

    message: "Database Connected Successfully"

  });

}