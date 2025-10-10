import React from "react";
import { LayoutDashboard, Box, Tags, ShoppingCart, Users, BarChart2, Settings, LogOut, Crown, FileText } from "lucide-react";

interface SidebarProps {
  selected: string;
  onSelect: (key: string) => void;
}

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} />, color: "from-blue-500 to-blue-600" },
  { key: "products", label: "Products", icon: <Box size={20} />, color: "from-emerald-500 to-emerald-600" },
  { key: "categories", label: "Categories", icon: <Tags size={20} />, color: "from-purple-500 to-purple-600" },
  { key: "pages", label: "Pages", icon: <FileText size={20} />, color: "from-teal-500 to-teal-600" },
  { key: "orders", label: "Orders", icon: <ShoppingCart size={20} />, color: "from-green-500 to-green-600" },
  { key: "customers", label: "Customers", icon: <Users size={20} />, color: "from-orange-500 to-orange-600" },
  { key: "reports", label: "Reports", icon: <BarChart2 size={20} />, color: "from-pink-500 to-pink-600" },
  { key: "settings", label: "Settings", icon: <Settings size={20} />, color: "from-indigo-500 to-indigo-600" },
];

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative flex flex-col items-center py-8 px-6 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-2xl ring-4 ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="Admin Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Crown className="w-4 h-4 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Admin Panel
        </h2>
        <p className="text-sm text-slate-400 mt-1">inzovu-market.com</p>
        <div className="mt-3 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
          <span className="text-xs font-medium text-blue-300">Administrator</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map(({ key, label, icon, color }) => {
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`group relative flex items-center gap-4 w-full px-4 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md"
                }`}
              >
                {/* Background glow for selected */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
                )}

                {/* Icon with gradient background */}
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                  isSelected
                    ? "bg-white/20 shadow-lg"
                    : `bg-gradient-to-r ${color} shadow-md group-hover:shadow-lg`
                }`}>
                  <div className={isSelected ? "text-white" : "text-white"}>
                    {icon}
                  </div>
                </div>

                {/* Label */}
                <span className={`font-medium transition-all duration-300 ${
                  isSelected ? "text-white" : "group-hover:text-white"
                }`}>
                  {label}
                </span>

                {/* Active indicator */}
                {isSelected && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="relative px-4 py-4 border-t border-slate-700/50 backdrop-blur-sm">
        <button className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-transparent hover:border-red-500/30">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
            <LogOut size={18} />
          </div>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
