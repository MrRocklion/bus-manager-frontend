"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TransactionsTableProps } from "@/types/transactions"
import { getCardTypeBadge } from "./card-type-badge"
import { useEffect } from "react"
export default function TransactionsTable({ transactions }: TransactionsTableProps) {


  const getUploadStatusBadge = (status: boolean) => {
    return status ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        Cargado
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
        Faltante
      </Badge>
    )
  }


  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lista de Transacciones</h1>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Codigo</TableHead>
              <TableHead className="font-semibold">Tipo</TableHead>
              <TableHead className="font-semibold">Fecha</TableHead>
              <TableHead className="font-semibold">Hora</TableHead>
              <TableHead className="font-semibold">Debito</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Hora Servidor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{transaction.card_code}</TableCell>
                <TableCell>{getCardTypeBadge(transaction.card_type)}</TableCell>
                <TableCell className="text-gray-600">{transaction.date}</TableCell>
                <TableCell>{transaction.time}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell className="text-gray-600">{getUploadStatusBadge(transaction.uploaded)}</TableCell>
                <TableCell className="text-gray-600">{transaction.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-gray-500">Mostrando {transactions.length} Transacciones</div>
    </div>
  )
}
