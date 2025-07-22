'use client';
import React, { useState, useEffect } from "react";
import {  CameraOff } from "lucide-react";
export function CameraFeed() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const baseUrl = "192.168.20.209";
  //   const url = `http://${baseUrl}:5000/video_feed`;
  //   setVideoSrc(url);
  // }, []);



  return (
    <div className="flex-1 p-2 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
      {videoSrc && !error ? (
        <img
          src={videoSrc}
          alt="Cámara en Vivo"
          className="rounded-lg max-h-full max-w-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex  flex-col items-center">
          <CameraOff className="h-16 w-16 text-white" />
          <p className="text-white text-lg mt-2">Cámara no disponible</p>
          <p className="text-white text-sm mt-1 opacity-70">Reintentando conexión...</p>
        </div>
      )}
    </div>
  );
}
