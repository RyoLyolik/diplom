import React from "react";

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks";
import { LoadingPage } from "../../pages/loading/LoadingPage";

export function ProtectedRoute() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <LoadingPage text="Проверяем авторизацию..." />;

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
