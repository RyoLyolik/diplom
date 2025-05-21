import { apiAxiosInstance, BaseOkResponce } from "../axiosInstance";
import { API_PATHS } from "../endpointPaths";

type RegisterRequestType = {
	email: string;
	password: string;
	token: string;
};

type LoginRequestType = Omit<RegisterRequestType, "token">;

export const authService = {
	registerAdmin: (data: RegisterRequestType) =>
		apiAxiosInstance.post<BaseOkResponce>(API_PATHS.AUTH.REGISTER, data),
	login: (data: LoginRequestType) =>
		apiAxiosInstance.post<BaseOkResponce>(API_PATHS.AUTH.LOGIN, data),
};
