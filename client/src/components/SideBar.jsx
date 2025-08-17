import React from "react";

const SideBar = ({ setActiveTab, activeTab }) => {
  return (
    <div className="w-60 bg-gray-900 text-white p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">File Manager</h2>

      <button
        onClick={() => setActiveTab("upload")}
        className={`block w-full text-left p-3 rounded ${
          activeTab === "upload" ? "bg-gray-700" : "hover:bg-gray-800"
        }`}
      >
        Upload
      </button>

      <button
        onClick={() => setActiveTab("files")}
        className={`block w-full text-left p-3 rounded ${
          activeTab === "files" ? "bg-gray-700" : "hover:bg-gray-800"
        }`}
      >
        Files
      </button>
    </div>
  );
};

export default SideBar;
