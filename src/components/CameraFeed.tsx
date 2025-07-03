'use client';
import { useState, useEffect } from "react";
import {  CameraOff } from "lucide-react";
export function CameraFeed() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const url = `http://${baseUrl}:5000/video_feed`;
    setVideoSrc(url);
  }, []);

  // Si ocurre error, vuelve a intentar en 5 segundos
  useEffect(() => {
    let retryTimer: NodeJS.Timeout;
    if (error) {
      retryTimer = setTimeout(() => {
        setError(false);
        setVideoSrc((prev) => {
          // Reinicia el stream forzando recarga con un query param
          const baseUrl = typeof window !== "undefined" ? window.location.hostname : "localhost";
          return `http://${baseUrl}:5000/video_feed?_=${Date.now()}`;
        });
      }, 5000);
    }

    return () => clearTimeout(retryTimer);
  }, [error]);

  return (
    <div className="flex-1 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
      {videoSrc && !error ? (
        <img
          src={videoSrc}
          alt="Cámara en Vivo"
          className="rounded-lg max-h-full max-w-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center">
          <CameraOff className="h-16 w-16 text-white" />
          <p className="text-white text-lg mt-2">Cámara no disponible</p>
          <p className="text-white text-sm mt-1 opacity-70">Reintentando conexión...</p>
        </div>
      )}
    </div>
  );
}
