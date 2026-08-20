export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface CryptoRate {
  name: string;
  symbol: string;
  priceUsd: number;
  change24h: number;
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}
