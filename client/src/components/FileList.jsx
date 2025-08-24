import React, { useState, useEffect } from "react";
import {
  Download,
  ExternalLink,
  Folder,
  FileText,
  Delete,
  Edit,
  Trash,
} from "lucide-react";
import { useShowPopup } from "@/hooks/useShowPopup";
export const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showPopup, popupMessage, show } = useShowPopup();
  const fetchFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:80/${currentPath}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      setFileList(data);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(err.message);
      // Fallback for demonstration
      setFileList([
        { name: "images", type: "folder", id: "1" },
        {
          name: "Lecture 4 Machine Learning (Stanford).mp4",
          type: "video",
          id: "2",
        },
        { name: "Node.js Curriculum.pdf", type: "pdf", id: "3" },
        { name: "numbers.txt", type: "text", id: "4" },
        { name: "My_Vacation_Photos", type: "folder", id: "5" },
        { name: "financial_report_2024.xlsx", type: "excel", id: "6" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  const handleFolderClick = (folderName) => {
    setCurrentPath((prev) => (prev ? `${prev}/${folderName}` : folderName));
  };

  const handleGoBack = () => {
    const pathArray = currentPath.split("/");
    pathArray.pop();
    setCurrentPath(pathArray.join("/"));
  };

  const handleOpenFile = async (fileName) => {
    const filePath = currentPath
      ? `${currentPath}/${fileName}?action=open`
      : `${fileName}?action=open`;
    const url = `http://localhost:80/${filePath}`;

    try {
      window.open(url, "_blank");
    } catch (err) {
      console.error("Error opening file:", err);
    }
  };

  const handleDownloadFile = (fileName) => {
    const filePath = currentPath
      ? `${currentPath}/${fileName}?action=download`
      : `${fileName}?action=download`;
    const url = `http://localhost:80/${filePath}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDeleteFile = async (fileName) => {
    const filePath = currentPath ? `${currentPath}/${fileName}` : `${fileName}`;
    const url = `http://localhost:80/${filePath}`;

    try {
      console.log(url);

      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);
      const data = res.json();

      console.log(`File deleted: ${await res.text()}`);
      show(`${fileName} ${data?.message} ✅`);
      fetchFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
            File Explorer
          </h2>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Path:</span>
          <span className="font-medium text-gray-300">
            /{currentPath || "Root"}
          </span>
          {currentPath && (
            <button
              onClick={handleGoBack}
              className="px-2 py-1 text-xs rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
            >
              Back
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-400 py-10">Loading files...</div>
      )}
      {error && (
        <div className="text-center text-red-400 py-10">
          Error: Could not fetch files.
        </div>
      )}
      {!loading && fileList.length === 0 && (
        <div className="text-center text-gray-400 py-10">No files found.</div>
      )}

      <div className="space-y-3">
        {fileList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 transition-all duration-200 hover:scale-[1.01] hover:bg-gray-700/50"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              {item.type === "folder" ? (
                <Folder className="text-teal-400 w-6 h-6" />
              ) : (
                <FileText className="text-blue-400 w-5 h-5" />
              )}
              <span
                title={item.name} // 👈 tooltip on hover
                className="text-sm sm:text-base font-semibold text-gray-200 truncate block max-w-[600px] cursor-pointer"
              >
                {item.name ||}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.type === "folder" ? (
                <button
                  onClick={() => handleFolderClick(item.name)}
                  className="flex items-center gap-1 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                >
                  <ExternalLink size={14} /> Open
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleOpenFile(item.name)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <ExternalLink size={14} /> Open
                  </button>
                  <button
                    onClick={() => handleDownloadFile(item.name)}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <Download size={14} /> Download
                  </button>
                  <button
                    onClick={() => handleDeleteFile(item.name)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <Trash size={14} />
                  </button>
                  <button
                    onClick={() => console.log(`Renaming file: ${item.name}`)}
                    className="flex items-center gap-1 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <Edit size={14} /> Rename
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Popup UI element - it will be visible only when `showPopup` is true */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-2xl z-50 animate-fade-in-down transition-all duration-300">
          <p className="text-lg font-semibold">{popupMessage}</p>
        </div>
      )}
    </div>
  );
};
