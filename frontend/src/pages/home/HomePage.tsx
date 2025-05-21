import { Navigate } from "react-router";
import { useAuth } from "../../hooks";
import { LoadingPage } from "../loading/LoadingPage";
import { AdminPage } from "./admin";

export function HomePage() {
	const { user, isLoading } = useAuth();

	if (isLoading) return <LoadingPage text="Проверяем права доступа..." />;

	if (user?.isAdmin) return <AdminPage />;

	return <Navigate to="/power-supply" />;
}
