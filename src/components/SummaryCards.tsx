import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';
import type { CryptoRate } from '../types';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  cryptoRates: CryptoRate[];
  loadingRates: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalBalance,
  totalIncome,
  totalExpense,
  cryptoRates,
  loadingRates,
}) => {
  const formatIDR = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="space-y-6">
      {/* Top Main Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Saldo</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800">{formatIDR(totalBalance)}</h3>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-2">
              <TrendingUp className="w-3.5 h-3.5 mr-1" /> Ready Cash & Savings
            </span>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Pemasukan</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800">{formatIDR(totalIncome)}</h3>
            <span className="text-xs font-medium text-slate-400 mt-2 block">Bulan ini</span>
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Pengeluaran</span>
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-slate-800">{formatIDR(totalExpense)}</h3>
            <span className="text-xs font-medium text-slate-400 mt-2 block">Bulan ini</span>
          </div>
        </div>
      </div>

      {/* Crypto / Market Ticker Widget */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold text-slate-200">Live Crypto Rates (Axios Feed):</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          {loadingRates ? (
            <span className="text-slate-400">Memuat kurs crypto...</span>
          ) : (
            cryptoRates.map((item) => (
              <div key={item.symbol} className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50 flex items-center space-x-2">
                <span className="font-bold text-slate-300">{item.symbol}</span>
                <span className="font-medium text-slate-100">${item.priceUsd.toLocaleString()}</span>
                <span className={`font-semibold ${item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
