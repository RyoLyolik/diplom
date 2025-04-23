import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// components/Navigation.tsx
export default function Navigation() {
    const { user, loading, error, logout } = useUser();
    const isAdmin = user?.role.title === "admin";
    const isEmployee = user?.role.title === "employee";
    return (
      <nav className="bg-black shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-lime-600">DCM</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/account"
                    className="border-transparent text-gray-200 hover:border-gray-50 hover:text-gray-50 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Аккаунт
                  </Link>
                {isAdmin && (
                  <Link
                    href="/users"
                    className="border-transparent text-gray-200 hover:border-gray-50 hover:text-gray-50 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Список пользователей
                  </Link>
                )}
                
                {isEmployee && (
                  <Link
                    href="/monitoring"
                    className="border-transparent text-gray-200 hover:border-gray-50 hover:text-gray-50 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Мониторинг
                  </Link>
                )}
                  { isEmployee && (<Link
                    href="/reports"
                    className="border-transparent text-gray-200 hover:border-gray-50 hover:text-gray-50 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Отчеты
                  </Link>)}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-lime-700 hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-800"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }