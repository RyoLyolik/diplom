import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { authService } from "../api";

export type UserType = {
	email: string;
	password: string;
	isAdmin: boolean;
};

export const useAuth = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const auth = async (email: string, password: string, isAdmin: boolean) => {
		try {
			const response = await authService.login({ email, password });
			if (response.data.status !== "Ok") {
				throw "Не удалось войти в аккаунт";
			}

			setUser({
				email,
				password,
				isAdmin,
			});
		} catch (e) {
			console.error("Ошибка при попытке войти: ", e);
			setUser(null);
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			const email = Cookies.get("email");
			const password = Cookies.get("password");
			const token = Cookies.get("token");

			const isAdmin = !!token;
			const isAuthed = !!email && !!password;

			if (isAuthed) {
				await auth(email, password, isAdmin);
			} else {
				setUser(null);
			}
		};

		checkAuth().finally(() => setIsLoading(false));
	}, []);

	const logout = () => {
		setUser(null);
		Cookies.remove("email");
		Cookies.remove("password");
		Cookies.remove("token");
		Cookies.remove("brick-session-id");
	};

	return { user, isLoading, logout, auth };
};
