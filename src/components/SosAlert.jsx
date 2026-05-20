"use client";

import { useState } from "react";

export default function SosAlert({ trackingData }) {
  const [isResetting, setIsResetting] = useState(false);

  // ================= Reset SOS Function =================
  const handleMarkAsSafe = async () => {
    setIsResetting(true);
    
    try {
      // Hardware ko chup karane ke liye PATCH request bhejo
      const res = await fetch("/api/location", {
        method: "PATCH",
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert("Safe command sent! Hardware will reset in a few seconds.");
      } else {
        alert("Failed to send command.");
      }
    } catch (error) {
      console.error("Error marking safe", error);
      alert("Something went wrong!");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Emergency Status
      </h2>

      {trackingData?.sos ? (
        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">I NEED HELP!</h3>
          <p className="text-sm mb-4">Emergency SOS Triggered</p>
          
          {/* ================= Naya Reset Button ================= */}
          <button 
            onClick={handleMarkAsSafe}
            disabled={isResetting}
            className={`px-4 py-2 font-semibold text-white rounded-lg shadow-md transition-all 
              ${isResetting ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 active:scale-95"}`}
          >
            {isResetting ? "Sending Command..." : "Mark as Safe"}
          </button>
        </div>
      ) : (
        <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold">SAFE</h3>
          <p className="mt-2 text-sm">No Emergency Detected</p>
        </div>
      )}
    </div>
  );
}














// export default function SosAlert({ trackingData }) {

//   return (
//     <div className="bg-white rounded-2xl shadow-sm p-5">

//       <h2 className="text-xl font-semibold mb-4 text-gray-700">
//         Emergency Status
//       </h2>


//       {
//         trackingData?.sos ? (

//           <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-6 text-center">

//             <h3 className="text-2xl font-bold">
//               I NEED HELP!
//             </h3>

//             <p className="mt-2 text-sm">
//               Emergency SOS Triggered
//             </p>

//           </div>

//         ) : (

//           <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl p-6 text-center">

//             <h3 className="text-2xl font-bold">
//               SAFE
//             </h3>

//             <p className="mt-2 text-sm">
//               No Emergency Detected
//             </p>

//           </div>

//         )
//       }

//     </div>
//   );
// }
