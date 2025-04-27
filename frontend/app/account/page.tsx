"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/NavBar";
import { useUser } from "@/contexts/UserContext";


export default function AccountPage() {
    const router = useRouter();
    const { user, loading, error, logout } = useUser();
    console.log(user);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    User data not available
                </div>
            </div>
        );
    }

    const formattedDate = new Date(user.creation_date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation/>
            <iframe
            src="http://localhost:3000/d-solo/aejmchktast1ch/test-current-2?orgId=1&from=1745401205127&to=1745401505127&timezone=browser&tab=transformations&panelId=1&__feature.dashboardSceneSolo"
            width="500"
            height="500"
            frameBorder="0"></iframe>
            <iframe
            src="http://localhost:3000/goto/A7sIu-1NR?orgId=1"
            width="1000"
            height="500"
            frameBorder="0"></iframe>
            {/* Основное содержимое */}
            <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gray-950 shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-900">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-50">
                                    Информация об аккаунте
                                </h3>
                                <div className="text-sm text-gray-500">
                                    Роль: {user.role.title}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-400">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-200">{user.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-400">
                                        Дата регистрации
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-200">{formattedDate}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="px-4 py-4 sm:px-6 border-t border-gray-900 bg-gray-950">
                            <div className="flex justify-end space-x-3">
                                {/* <Link
                                    href="/edit-profile"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Редактировать профиль
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}