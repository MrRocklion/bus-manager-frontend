'use client';
import TransactionsTable from "@/components/transactions-table";
import { useState, useEffect } from 'react';
import { fetchTransactions } from "@/lib/api";
import { start } from "repl";
import { Transaction } from "@/types/transactions";

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {

        async function loadTransactions() {
            try {
                setIsLoading(true);
                const data = await fetchTransactions({ startDate: "2025-07-04T08:40:00", endDate:"2025-07-24T10:10:00" });
                console.log("Transactions fetched:", data);
                setTransactions(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Error al cargar las transacciones');
            } finally {
                setIsLoading(false);
            }
        }
        loadTransactions();
    }, []);


    if (isLoading) {
        return <p>Cargando transacciones…</p>;
    }
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <>
            <TransactionsTable transactions={transactions} />

        </>
    );

}