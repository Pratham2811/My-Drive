import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Info,
  Printer,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFileIcon, formatFileSize } from "../constants/file.constants";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export const FileViewer = ({ file, onClose, onDownload }) => {
  const [zoom, setZoom] = useState(100);
  const [showInfo, setShowInfo] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { activeSource } = useSelector((state) => state.explorer);
  const isGoogleDrive = activeSource === "gdrive";

  if (!file) return null;

  useEffect(() => {
    setZoom(100);
    setRotation(0);
    setIsLoading(true);
  }, [file.id]);

  const fileUrl = isGoogleDrive
    ? `http://localhost:80/api/integrations/google-drive/file/${file.id}`
    : `http://localhost:80/api/file/${file.id}`;

  const FileIcon = getFileIcon(file.mimeType || file.type);

  const isImage = file.mimeType?.startsWith("image/");
  const isPDF = file.mimeType === "application/pdf";
  const isVideo = file.mimeType?.startsWith("video/");
  const isAudio = file.mimeType?.startsWith("audio/");

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrint = () => {
    const printWindow = window.open(fileUrl, "_blank");
    if (printWindow) printWindow.onload = () => printWindow.print();
  };

  const renderContent = () => {
    if (isImage) {
      return (
        <div
          className="relative transition-all duration-300 ease-out"
          style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
        >
          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-md">
              <div className="h-8 w-8 border-2 border-white/20 border-t-white animate-spin rounded-full" />
            </div>
          )}

          <img
            src={fileUrl}
            alt={file.name}
            onLoad={() => setIsLoading(false)}
            className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-md bg-transparent"
          />
        </div>
      );
    }

    if (isPDF) {
      return (
        <embed
          src={fileUrl}
          className="w-full h-full max-w-5xl rounded-lg bg-white shadow-2xl"
          title={file.name}
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={fileUrl}
          controls
          autoPlay
          className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
        />
      );
    }

    if (isAudio) {
      return (
        <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl text-center border border-slate-800">
          <FileIcon size={64} className="text-indigo-400 mx-auto mb-6" />
          <h3 className="text-white text-xl mb-2">{file.name}</h3>
          <p className="text-slate-400 text-sm mb-6">
            {formatFileSize(file.size)}
          </p>
          <audio src={fileUrl} controls className="w-full" />
        </div>
      );
    }

    return (
      <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800">
        <FileIcon size={80} className="text-slate-600 mx-auto mb-6" />
        <h3 className="text-white text-lg mb-2">No preview available</h3>
        <Button onClick={() => onDownload(file)}>
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* 🔴 Transparent Background Layer */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

      {/* 🟢 Content Layer */}
      <div className="relative flex flex-col flex-1 text-slate-200">
        {/* Top Bar */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/50">
          <div className="flex items-center gap-4">
            <Button onClick={onClose} variant="ghost" size="icon">
              <X size={20} />
            </Button>
            <span className="text-white">{file.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {isImage && (
              <>
                <Button onClick={handleZoomOut} size="icon">
                  <ZoomOut size={14} />
                </Button>
                <span>{zoom}%</span>
                <Button onClick={handleZoomIn} size="icon">
                  <ZoomIn size={14} />
                </Button>
                <Button onClick={handleRotate} size="icon">
                  <RotateCw size={16} />
                </Button>
              </>
            )}

            <Button onClick={handlePrint} size="icon">
              <Printer size={16} />
            </Button>

            <Button onClick={() => onDownload(file)} size="icon">
              <Download size={16} />
            </Button>

            <Button onClick={() => setShowInfo(!showInfo)} size="icon">
              <Info size={16} />
            </Button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
          {renderContent()}
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-80 bg-slate-900 border-l transition-transform",
            showInfo ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-6 space-y-4">
            <p><b>Name:</b> {file.name}</p>
            <p><b>Size:</b> {formatFileSize(file.size)}</p>
            <p><b>Type:</b> {file.mimeType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;