export default function SosAlert({ trackingData }) {

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Emergency Status
      </h2>


      {
        trackingData?.sos ? (

          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-6 text-center">

            <h3 className="text-2xl font-bold">
              I NEED HELP!
            </h3>

            <p className="mt-2 text-sm">
              Emergency SOS Triggered
            </p>

          </div>

        ) : (

          <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl p-6 text-center">

            <h3 className="text-2xl font-bold">
              SAFE
            </h3>

            <p className="mt-2 text-sm">
              No Emergency Detected
            </p>

          </div>

        )
      }

    </div>
  );
}
