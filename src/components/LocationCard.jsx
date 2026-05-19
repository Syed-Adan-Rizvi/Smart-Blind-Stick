export default function LocationCard({ trackingData }) {

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Current Location
      </h2>


      <div className="space-y-4">

        <div>
          <p className="text-sm text-gray-500">
            Latitude
          </p>

          <p className="text-lg font-medium">
            {trackingData?.latitude}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Longitude
          </p>

          <p className="text-lg font-medium">
            {trackingData?.longitude}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Last Updated
          </p>

          <p className="text-lg font-medium">
            {new Date(trackingData?.updatedAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}
