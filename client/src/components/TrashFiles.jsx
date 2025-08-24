import React, { useState, useEffect } from 'react';

const TrashFiles = () => {
  // Use useState with an empty array as the initial state
  // to correctly hold the list of trash files.
  const [trashFiles, setTrashFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the list of files from the server's /trash endpoint.
   */
  const fetchTrashFiles = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:80/trash`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      setTrashFiles(data);
    } catch (err) {
      console.error("Failed to fetch trash files:", err);
      setError("Failed to load trash files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to call the fetch function when the component mounts.
  useEffect(() => {
    fetchTrashFiles();
  }, []); // The empty dependency array ensures this runs only once

  // Render different content based on the state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        <p>Loading trash files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  // Render the list of files
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Trash Files</h1>
      {trashFiles.length === 0 ? (
        <p className="text-gray-400">Your trash is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trashFiles.map((file, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between transition-all hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-x text-red-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <path d="M14 2v6h6" />
                  <path d="m15 10-6 6" />
                  <path d="m9 10 6 6" />
                </svg>
                <span className="text-gray-200 truncate">{file.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrashFiles;
