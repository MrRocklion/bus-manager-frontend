
import { Transaction,Counter } from "@/types/transactions";
import { FetchTransactionsOpts } from "@/types/transactions";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.20.245:8000';
interface FetchTransactionResponse {
	result: Transaction[];
}

interface FetchCounterResponse {
	result: Counter[];
}



export async function fetchTransactions({
	startDate,
	endDate,
	signal,
}: FetchTransactionsOpts): Promise<Transaction[]> {
	const url = new URL('/api/transactions/by_date', API_BASE);
	url.searchParams.set('start_datetime', startDate);
	url.searchParams.set('end_datetime', endDate);
	console.log(`fetchTransactions: ${url.toString()}`);
	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		signal,
	});
	if (!res.ok) {
		let errMsg = `Error ${res.status}`;
		try {
			const errBody = await res.json();
			errMsg = errBody?.message ?? errMsg;
		} catch {
		}
		throw new Error(`fetchTransactions: ${errMsg}`);
	}
	const body = (await res.json()) as FetchTransactionResponse;
	return body.result;
}


export async function fetchCounters(){
	const url = new URL('/api/passengers/today', API_BASE);
	console.log(`fetchCounters: ${url.toString()}`);
	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
	});
	if (!res.ok) {
		let errMsg = `Error ${res.status}`;
		try {
			const errBody = await res.json();
			errMsg = errBody?.message ?? errMsg;
		} catch {
		}
		throw new Error(`fetchCounters: ${errMsg}`);
	}
	const body = (await res.json()) as FetchCounterResponse;
	return body.result;

}