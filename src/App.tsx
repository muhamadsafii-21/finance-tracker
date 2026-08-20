import { useState, useEffect } from 'react';
import type { Transaction, CryptoRate } from './types';
import { fetchTransactions, fetchCryptoRates } from './services/api';
import { Navbar } from './components/Navbar';
import { SummaryCards } from './components/SummaryCards';
import { TransactionForm } from './components/TransactionForm';
import { ExpenseChart } from './components/ExpenseChart';
import { TransactionTable } from './components/TransactionTable';
import { RefreshCw, AlertCircle } from 'lucide-react';

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cryptoRates, setCryptoRates] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRates, setLoadingRates] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load Initial Data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError('Gagal memuat data transaksi. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load Crypto Rates from CoinGecko Axios API
  const loadRates = async () => {
    setLoadingRates(true);
    try {
      const rates = await fetchCryptoRates();
      setCryptoRates(rates);
    } catch (err) {
      console.error('Error fetching crypto rates:', err);
    } finally {
      setLoadingRates(false);
    }
  };

  useEffect(() => {
    loadData();
    loadRates();
  }, []);

  // Add New Transaction
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Delete Transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Calculate Aggregates
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased pb-12">
      {/* SaaS Navigation Bar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Title & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Keuangan
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Pantau dan kelola arus kas pribadi Anda dengan mudah.
            </p>
          </div>
          <button
            onClick={() => {
              loadData();
              loadRates();
            }}
            className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-sm self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} /> Synchronize Data
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
            Memuat dashboard keuangan...
          </div>
        ) : (
          <>
            {/* Summary Cards Component */}
            <SummaryCards
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              cryptoRates={cryptoRates}
              loadingRates={loadingRates}
            />

            {/* Grid for Form & Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Input Section */}
              <div className="lg:col-span-7">
                <TransactionForm onAddTransaction={handleAddTransaction} />
              </div>

              {/* Expense Pie Chart Visualization */}
              <div className="lg:col-span-5">
                <ExpenseChart transactions={transactions} />
              </div>
            </div>

            {/* Transactions History Table */}
            <TransactionTable
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
