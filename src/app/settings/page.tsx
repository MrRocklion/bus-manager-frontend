"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import NumericInput from "@/components/numeric-input";
import { Label } from "@radix-ui/react-label";
import CameraStreamCanvas from "@/components/camera-stream";
export default function SettingsPage() {
    const [crossLineY, setCrossLineY] = useState(600)
    const [trackBuffer, setTrackBuffer] = useState(70);
    const [trackThreshold, setTrackThreshold] = useState(0.9999);
    const [drawPoints, setDrawPoints] = useState(false);
    const router = useRouter();

    const returnHome = () => {
        router.push("/");
    }
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Ajustes Del Sistema de Conteo</h1>
            <div className="grid md:grid-cols-6 gap-4 mb-6 grid-cols-1">
                <Button onClick={returnHome} className="bg-green-700 hover:bg-green-600 active:bg-green-800">
                    <ArrowLeft className="h-4 w-4" />
                    Regresar
                </Button>
                <Button className="bg-blue-700 hover:bg-blue-600  active:bg-blue-800">Obtener Datos</Button>
                <Button className={drawPoints ? "bg-red-700 hover:bg-red-600 active:bg-red-800" : "bg-blue-700 hover:bg-blue-600 active:bg-blue-800"} onClick={() => setDrawPoints(!drawPoints)}>
                    {drawPoints ? "Dejar de Dibujar Puntos" : "Dibujar Puntos"}
                </Button>
            </div>
       
             
            
            <div className="grid md:grid-cols-6 gap-4 mb-6 grid-cols-1">
                <div className="col-span-1 md:col-span-5 bg-gray-900">
                    <CameraStreamCanvas crossLineY={crossLineY}  drawPoints={drawPoints} />
                </div>
                <div className="col-span-1 md:col-span-1 ">
                    <p className="text-gray-900 font-bold">Parametros Ajustables.</p>
                    <div className="flex flex-col gap-2 ">
                        <p>Linea de Inferencia</p>
                        <NumericInput
                            value={crossLineY}
                            onChange={setCrossLineY}
                            min={0}
                            max={720}
                            step={10}
                            placeholder="Ingresa un número"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Track Buffer</Label>
                        <NumericInput
                            value={trackBuffer}
                            onChange={setTrackBuffer}
                            min={0}
                            max={300}
                            step={5}
                            placeholder="Ingresa un número"
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label>Track Treshold</Label>
                        <NumericInput
                            value={trackThreshold}
                            onChange={setTrackThreshold}
                            min={0}
                            max={1}
                            step={0.01}
                            placeholder="Ingresa un número"
                        />
                    </div>

                      <Button className="bg-blue-700 hover:bg-blue-600 mt-10 w-full active:bg-blue-800">Cargar Parametros</Button>
                </div>
            </div>
        </div>
    );
}