import React, { useState, useEffect } from "react";
import {
  Download,
  ExternalLink,
  Folder,
  FileText,
  Delete,
  Edit,
} from "lucide-react";

export const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
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
      // Fallback for demonstration in this environment
      setFileList([
        { name: "images", type: "folder", id: "1" },
        { name: "Lecture 4 Machine Learning (Stanford).mp4", type: "video", id: "2" },
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
console.log(fileList);

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
  a.download = fileName; // hint for browser
  document.body.appendChild(a);
  a.click();
  a.remove();
};

  const handleDeleteFile = async (fileName) => {
    const filePath = currentPath ? `${currentPath}/${fileName}` : `${fileName}`;
    const url = `http://localhost:80/${filePath}?action=delete`;
    console.log("dunction is runiing");
    
    try {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error: ${res.statusText}`);

      console.log(`File deleted: ${await res.text()}`);
      fetchFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            File Explorer
          </h2>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Path:</span>
          <span className="font-semibold text-gray-200">{currentPath || "Root"}</span>
          {currentPath && (
            <button
              onClick={handleGoBack}
              className="px-2 py-1 text-xs rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>
      
      {loading && <div className="text-center text-gray-400">Loading files...</div>}
      {error && <div className="text-center text-red-400">{error}</div>}

      <div className="space-y-3">
        {fileList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md transition-transform transform hover:scale-[1.01] hover:bg-gray-800/80 duration-200"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              {item.type === "folder" ? (
                <Folder className="text-indigo-400 w-6 h-6" />
              ) : (
                <FileText className="text-blue-400 w-5 h-5" />
              )}
              <span className="text-sm sm:text-base font-semibold text-gray-200 truncate">{item.name}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.type === "folder" ? (
                <button
                  onClick={() => handleFolderClick(item.name)}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} /> Open
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleOpenFile(item.name)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} /> Open
                  </button>
                  <button
                    onClick={() => handleDownloadFile(item.name)}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Download size={14} /> Download
                  </button>
                  <button
                    onClick={() => handleDeleteFile(item.name)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Delete size={14} /> Delete
                  </button>
                  <button
                    onClick={() => console.log(`Renaming file: ${item.name}`)}
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Edit size={14} /> Rename
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
