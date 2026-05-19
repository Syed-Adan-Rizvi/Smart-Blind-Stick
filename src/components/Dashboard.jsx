"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import LocationCard from "./LocationCard";
import SosAlert from "./SosAlert";
import LiveStatus from "./LiveStatus";


// Disable SSR For Leaflet Map
const LiveMap = dynamic(
  () => import("./LiveMap"),
  {
    ssr: false
  }
);


export default function Dashboard() {

  // Store API Data
  const [trackingData, setTrackingData] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);


  // ================= Fetch Function =================
  const fetchLocation = async () => {

    try {

      // Fetch Latest Tracking Data
      const response = await fetch("/api/location");

      // Convert Response Into JSON
      const data = await response.json();

      // If API Success
      if (data.success) {

        // Store Data In State
        setTrackingData(data.data);

      }

      // Stop Loading
      setLoading(false);

    } catch (error) {

      console.log(error);

    }

  };


  // ================= Polling =================
  useEffect(() => {

    // First Fetch
    fetchLocation();

    // Fetch Every 2 Seconds
    const interval = setInterval(() => {

      fetchLocation();

    }, 2000);


    // Cleanup Function
    return () => clearInterval(interval);

  }, []);



  // ================= Loading UI =================
  if (loading) {

    return (

      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">

        Loading...

      </div>

    );

  }



  return (

    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">

      {/* ================= Header ================= */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">

            Smart Blind Stick Tracker

          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">

            Live GPS Tracking Dashboard

          </p>

        </div>


        {/* Live Status */}
        <LiveStatus />

      </div>



      {/* ================= Top Cards ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Location Information */}
        <LocationCard trackingData={trackingData} />

        {/* SOS Alert */}
        <SosAlert trackingData={trackingData} />

      </div>



      {/* ================= Live Map ================= */}
      <div className="bg-white rounded-2xl shadow-sm mt-6 p-5">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">

          Live Location Map

        </h2>


        {/* Leaflet Map Component */}
        <LiveMap trackingData={trackingData} />

      </div>

    </main>

  );

}
















// "use client";

// import { useEffect, useState } from "react";
// import LocationCard from "./LocationCard";
// import SosAlert from "./SosAlert";
// import LiveStatus from "./LiveStatus";
// import LiveMap from "./LiveMap";

// export default function Dashboard() {

//   // Store API Data
//   const [trackingData, setTrackingData] = useState(null);

//   // Loading State
//   const [loading, setLoading] = useState(true);

//   // Fetch Function
//   const fetchLocation = async () => {

//     try {

//       const response = await fetch("/api/location");

//       const data = await response.json();

//       if (data.success) {

//         setTrackingData(data.data);

//       }

//       setLoading(false);

//     } catch (error) {

//       console.log(error);

//     }

//   };


//   // Polling
//   useEffect(() => {

//     // First Fetch
//     fetchLocation();

//     // Fetch Every 2 Seconds
//     const interval = setInterval(() => {

//       fetchLocation();

//     }, 2000);


//     // Cleanup
//     return () => clearInterval(interval);

//   }, []);


//   // Loading UI
//   if (loading) {

//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         Loading...
//       </div>
//     );

//   }


//   return (
//     <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">

//       {/* Header */}
//       <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
//             Smart Blind Stick Tracker
//           </h1>

//           <p className="text-gray-500 mt-1 text-sm sm:text-base">
//             Live GPS Tracking Dashboard
//           </p>
//         </div>

//         <LiveStatus />

//       </div>


//       {/* Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Location Card */}
//         <LocationCard trackingData={trackingData} />

//         {/* SOS Alert */}
//         <SosAlert trackingData={trackingData} />

//       </div>


//       {/* Map Placeholder */}
//       <div className="bg-white rounded-2xl shadow-sm mt-6 p-5">

//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Live Location Map
//         </h2>

//         <div className="h-[300px] sm:h-[400px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
//           Map Will Be Added Here
//         </div>

//       </div>

//     </main>
//   );
// }
