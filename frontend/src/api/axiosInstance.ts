import axios from "axios";

export type BaseOkResponce = {
	status: "Ok";
};

export const apiAxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

export const dataAxiosInstance = axios.create({
	baseURL: "http://localhost:9999/",
	withCredentials: true,
});
