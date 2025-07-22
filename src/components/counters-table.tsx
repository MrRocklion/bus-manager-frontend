"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react"
import { CounterTableProps } from "@/types/transactions";
import { getCardTypeBadge } from "./card-type-badge";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CountersTable({ counters }: CounterTableProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)

	const totalPages = Math.ceil(counters.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentData = counters.slice(startIndex, endIndex)

	const getSpecialStatus = (status: boolean) => {
		return status ? (
			<Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
				Normal
			</Badge>
		) : (
			<Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
				Normal
			</Badge>
		)
	}

	const goToFirstPage = () => setCurrentPage(1)
	const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1))
	const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1))
	const goToLastPage = () => setCurrentPage(totalPages)

	const handleItemsPerPageChange = (value: string) => {
		setItemsPerPage(Number(value))
		setCurrentPage(1)
	}

	return (
		<>
			<div className="border rounded-lg overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="bg-gray-50">
							<TableHead className="font-semibold">Id</TableHead>
							<TableHead className="font-semibold">Fecha</TableHead>
							<TableHead className="font-semibold">Tipo</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{counters.map((counter) => (
							<TableRow key={counter.id} className="hover:bg-gray-50">
								<TableCell className="font-medium">{counter.id}</TableCell>
								<TableCell>{counter.datetime}</TableCell>
								<TableCell className="text-gray-600">{getSpecialStatus(counter.special)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Filas por página</p>
					<Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent side="top">
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center space-x-6 lg:space-x-8">
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Página {currentPage} de {totalPages}
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
							onClick={goToFirstPage}
							disabled={currentPage === 1}
						>
							<span className="sr-only">Ir a la primera página</span>
							<ChevronsLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0 bg-transparent"
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
						>
							<span className="sr-only">Ir a la página anterior</span>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0 bg-transparent"
							onClick={goToNextPage}
							disabled={currentPage === totalPages}
						>
							<span className="sr-only">Ir a la página siguiente</span>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
							onClick={goToLastPage}
							disabled={currentPage === totalPages}
						>
							<span className="sr-only">Ir a la última página</span>
							<ChevronsRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-4 text-sm text-gray-500">Mostrando {counters.length} Conteos</div>
		</>


	)
}
