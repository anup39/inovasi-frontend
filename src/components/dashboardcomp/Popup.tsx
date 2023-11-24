import React from "react";

const Popup = ({ properties }) => {
  const propertyElements = Object.entries(properties).map(([key, value]) => (
    <div key={key} className="mb-2 truncate">
      <strong className="mr-1">{key}:</strong> {value}
    </div>
  ));

  return (
    <div className="bg-white rounded shadow-md p-4 max-w-xs md:max-w-sm max-h-48  overflow-auto">
      {/* <h3 className="text-lg font-semibold mb-2">Properties:</h3> */}
      <div className="divide-y divide-gray-200">{propertyElements}</div>
    </div>
  );
};

export default Popup;
