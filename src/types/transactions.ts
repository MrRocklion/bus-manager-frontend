export interface Transaction {
    id: number;
    card_code: string;
    card_type: string;
    date: string;
    time: string;
    amount: number;
    balance: number;
    last_balance: number;
    timestamp: string;
    uploaded: boolean;
}

export interface Counter {
  id: number;
  datetime: string;
  special: boolean;
}

export interface TransactionsTableProps {
  transactions: Transaction[]
}

export interface CounterTableProps {
  counters: Counter[]
}

export interface FetchTransactionsOpts {
  startDate:  string;
  endDate:  string;
  signal?: AbortSignal;
}