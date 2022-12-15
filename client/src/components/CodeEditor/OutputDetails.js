import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm dark:text-snow">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:text-black">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm dark:text-snow">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:text-black">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm dark:text-snow">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 dark:text-black">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
