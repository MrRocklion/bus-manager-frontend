'use client';
import { TrendingUp, Users, HardDriveUpload } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { useEffect, useState } from "react";
import { CameraFeed } from "@/components/CameraFeed";
import Link from "next/link";
export default function Home() {
	const [passengerCount, setPassengerCount] = useState<number>(0);

	useEffect(() => {
		const socket = new WebSocket(`ws://192.168.20.245:8000/ws/passenger-count`);


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
		<div className="h-full md:h-screen flex bg-slate-700">
			<main className="flex-1 p-5">
				<div className=" grid grid-cols-1 sm:grid-cols-4 gap-4 ">
					{cards.map((card, index) => (

						<StatCard
							key={index}
							title={card.title}
							value={card.value}
							icon={card.icon}
							color={card.color}
						/>
					))}
				</div>
				<div className=" grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 ">
					<div className="col-span-1 md:col-span-3 ">
						<div className="h-100 bg-slate-400 p-3 rounded-2xl flex flex-col">
							<h1 className="text-xl font-bold text-slate-900 p-2">Cámara en Tiempo Real</h1>
							<CameraFeed />
						</div>
					</div>


					<div className="flex flex-col space-y-4  w-full   bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6">
						<h2 className="text-lg font-semibold text-gray-700 mb-4">Opciones</h2>
						<Link href="/transactions" className="text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
							Transacciones
						</Link>

						<Link href="/counters" className="text-center bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200 shadow">
							Conteos
						</Link>

						<Link href="/settings" className="text-center bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-950 transition duration-200 shadow">
							Ajustes
						</Link>
					</div>

				</div>
			</main>
		</div>
	);
}
