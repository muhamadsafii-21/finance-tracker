import axios from 'axios';
import type { Transaction, CryptoRate } from '../types';

// Mock Initial Transactions Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Gaji',
    amount: 15000000,
    date: '2026-08-01',
    description: 'Gaji Bulanan Utama',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Makanan & Minuman',
    amount: 1250000,
    date: '2026-08-03',
    description: 'Belanja Bulanan Supermarket',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Tagihan & Utilitas',
    amount: 850000,
    date: '2026-08-05',
    description: 'Listrik, Air & Internet',
  },
  {
    id: '4',
    type: 'income',
    category: 'Investasi',
    amount: 2500000,
    date: '2026-08-10',
    description: 'Dividen Saham',
  },
  {
    id: '5',
    type: 'expense',
    category: 'Hiburan',
    amount: 450000,
    date: '2026-08-14',
    description: 'Langganan Streaming & Bioskop',
  },
];

// Axios Instance Configured
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch Initial Transactions (Simulated Async API Request)
 */
export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...INITIAL_TRANSACTIONS]);
    }, 600);
  });
};

/**
 * Fetch Market/Crypto Live Rates from CoinGecko Public API via Axios
 */
export const fetchCryptoRates = async (): Promise<CryptoRate[]> => {
  try {
    const response = await api.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
    );
    const data = response.data;
    
    return [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        priceUsd: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        priceUsd: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        priceUsd: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
      },
    ];
  } catch (error) {
    console.warn('Gagal mengambil data CoinGecko, menggunakan data fallback:', error);
    // Fallback data if API rate limited or offline
    return [
      { name: 'Bitcoin', symbol: 'BTC', priceUsd: 64250, change24h: 2.15 },
      { name: 'Ethereum', symbol: 'ETH', priceUsd: 3480, change24h: -0.85 },
      { name: 'Solana', symbol: 'SOL', priceUsd: 145, change24h: 4.30 },
    ];
  }
};
