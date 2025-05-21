import { apiAxiosInstance, BaseOkResponce } from "../axiosInstance";
import { API_PATHS } from "../endpointPaths";

export type EmployeeType = {
	id: string;
	email: string;
	creation_date: string;
	role: {
		title: string;
	};
};
export type EmployeeListResponseType = {
	status: "Ok";
	data: EmployeeType[];
};

export type CreateEmployeeProps = {
	email: string;
	password: string;
};

export const adminService = {
	getEmployeeList: () =>
		apiAxiosInstance.get<EmployeeListResponseType>(
			API_PATHS.ACCOUNT.GET_EMPLOYEE_LIST
		),
	createEmployee: (data: CreateEmployeeProps) =>
		apiAxiosInstance.post<BaseOkResponce>(
			API_PATHS.ACCOUNT.CREATE_EMPLOYEE,
			data
		),
};
