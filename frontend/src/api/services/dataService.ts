import { dataAxiosInstance } from "../axiosInstance";
import { API_PATHS } from "../endpointPaths";

type GetChartRequestProps = {
	parameter:
		| "hot"
		| "cold"
		| "conditioner"
		| "chiller"
		| "PDU"
		| "SCHR"
		| "IBP"
		| "DGU"
		| "GRSCH";
	position: number;
};

export type GetChartResponseType = {
	times: string[];
	data: Record<string, { uof: string; values: string[] }>;
};

export interface CreateIncidentParams {
	title: string;
	timestamp: string;
	file: File;
}

export type GetIncidentListResponseType = Array<{
	id: string;
	title: string;
	timestamp: string;
	filename: string;
}>;

export type GetReportListResponseType = Array<{
	filename: string;
	size: number;
	creation_date: string;
}>;

export type GroupingTypes = "second" | "minute" | "hour" | "day";

export type GenerateReportParams = {
	timefrom: string;
	timeto: string;
	grouping: GroupingTypes;
};

export const dataService = {
	getChartData: ({ parameter, position }: GetChartRequestProps) =>
		dataAxiosInstance.get<GetChartResponseType>(API_PATHS.DATA.GET_CHART, {
			params: { parameter, position },
		}),
	createIncident: (params: CreateIncidentParams) => {
		const formData = new FormData();
		formData.append("file", params.file);

		return dataAxiosInstance.post(
			API_PATHS.DATA.CREATE_INCIDENT,
			formData,
			{
				params: {
					title: params.title,
					timestamp: params.timestamp,
				},
			}
		);
	},
	getIncidentList: () =>
		dataAxiosInstance.get<GetIncidentListResponseType>(
			API_PATHS.DATA.GET_INCIDENT_LIST
		),
	getIncidentFile: (id: string) =>
		dataAxiosInstance.get(API_PATHS.DATA.GET_INCIDENT_FILE, {
			params: { id },
			responseType: "blob",
		}),
	getReportList: () =>
		dataAxiosInstance.get<GetReportListResponseType>(
			API_PATHS.DATA.GET_REPORT_LIST
		),
	getReportFile: (filename: string) =>
		dataAxiosInstance.get(API_PATHS.DATA.GET_REPORT_FILE, {
			params: { filename },
			responseType: "blob",
		}),
	generateReport: (data: GenerateReportParams) =>
		dataAxiosInstance.post(API_PATHS.DATA.GENERATE_REPORT, data),
};
