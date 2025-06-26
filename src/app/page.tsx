'use client';
import { TrendingUp, Users, HardDriveUpload, CameraOff } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useEffect, useState } from "react";
export default function Home() {
  const [passengerCount, setPassengerCount] = useState<number>(0);
 
   useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:8000/ws/passenger-count`);


    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (typeof data.count === "number") {
          setPassengerCount(data.count);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setPassengerCount(0);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setPassengerCount(0);
    };

    socket.onclose = () => {
      console.warn("WebSocket closed");
      setPassengerCount(0);
    };

    return () => socket.close();
  }, []);
   const cards = [
    {
      title: "Validaciones",
      value: "0",
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Pasajeros",
      value: passengerCount.toString(),
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Acumuladas",
      value: "0",
      icon: <HardDriveUpload className="h-8 w-8 text-emerald-500" />,
      color: "from-emerald-500 to-teal-400",
    },
  ];
  return (
    <div className="w-screen h-screen flex bg-slate-700">
      <main className="flex-1">
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-5 gap-8 p-4 box-border">
          {cards.map((card, index) => (
            <div>
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
              />
            </div>
          ))}
          <div></div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 row-span-4 p-5">
      <div className="h-full bg-slate-400 p-4 rounded-2xl flex flex-col">
        <h1 className="text-xl font-bold text-slate-950 p-2">Cámara en Tiempo Real</h1>

        {/* Contenedor que ocupa el alto restante */}
        <div className="flex-1 bg-slate-900 rounded-xl flex items-center justify-center">
          <CameraOff className="h-16 w-16 text-white" />
          <p className="text-white text-lg ml-4">Cámara no disponible</p>
        </div>
      </div>
    </div>
          <div className="row-span-4 ">
            <div className="flex flex-col space-y-4 h-100 w-full max-w-xs mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Opciones</h2>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
                Validaciones
              </button>

               <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
                Conteos
              </button>

            <button className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 shadow">
                Reportes
              </button>

              <button className="bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-950 transition duration-200 shadow">
                Ajustes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
