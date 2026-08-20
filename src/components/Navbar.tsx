import React from 'react';
import { LayoutDashboard, Wallet, CreditCard, PieChart, Settings, Bell, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-800 text-lg tracking-tight">FinTrack</span>
              <span className="ml-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                SaaS
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Transaksi</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <PieChart className="w-4 h-4" />
              <span>Analisis</span>
            </a>
          </nav>

          {/* Right Action Icons / Profile */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <div className="flex items-center space-x-2.5 cursor-pointer pl-1">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-800">John Doe</div>
                <div className="text-[10px] text-slate-400">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
