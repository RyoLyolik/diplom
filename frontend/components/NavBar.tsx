import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        <Link href="/monitoring" className="text-blue-400 hover:text-blue-300">
          Мониторинг
        </Link>
        <Link href="/dashboards" className="text-blue-400 hover:text-blue-300">
          Дашборды
        </Link>
        <Link href="/incidents" className="text-blue-400 hover:text-blue-300">
          Инциденты
        </Link>
        <Link href="/reports" className="text-blue-400 hover:text-blue-300">
          Отчеты
        </Link>
      </div>
    </nav>
  );
}
