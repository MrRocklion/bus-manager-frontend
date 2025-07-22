'use client';
import { useState, useEffect } from 'react';
import { fetchCounters } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Counter, Transaction } from "@/types/transactions";
import { CalendarPicker } from "@/components/CalendarPicker";
import { Button } from "@/components/ui/button";
import CountersTable from '@/components/counters-table';
export default function CountersPage() {
    const [counters, setCounters] = useState<Counter[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {

        async function loadCounters() {
            try {
                setIsLoading(true);
                const data = await fetchCounters();
                console.log("Counters fetched:", data);
                setCounters(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Error al cargar los contadores');
            } finally {
                setIsLoading(false);
            }
        }
        loadCounters();
    }, []);

    const returnHome =()=>{
        router.push("/");
    }


    if (isLoading) {
        return <p>Cargando Conteos....</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <>
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="grid md:grid-cols-6 gap-4 mb-6 grid-cols-1">
                    <Button onClick={returnHome} className="bg-green-700 hover:bg-green-600 active:bg-green-800">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar
                    </Button>
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Conteos de hoy:</h1>
                </div>
                

                <div className="grid md:grid-cols-6 gap-4 mb-6 grid-cols-1 items-end">
                    <CalendarPicker title="Selecciona una fecha" />
                    <Button className="bg-blue-700 hover:bg-blue-600  active:bg-blue-800">Filtrar</Button>
                    <Button>Ultimos 100 Registros</Button>
                    <Button>Ultimo Mes</Button>
                </div>
                <CountersTable counters={counters} />

            </div>
        </>
    );

}