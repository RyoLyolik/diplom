import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export interface ChartProps {
	x: string[];
	y: number[];
	uof: string;
	xName: string;
}

export const Chart: React.FC<ChartProps> = ({ x, y, uof, xName }) => {
	const formatter = new Intl.DateTimeFormat("ru-RU", {
		year: "2-digit",
		month: "2-digit",
		day: "numeric",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});

	const data = {
		labels: x.map((date) => formatter.format(new Date(date))),
		datasets: [
			{
				label: `${xName}, ${uof}`,
				data: y,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
				fill: false,
				pointRadius: 1,
			},
		],
	};

	const options = {
		responsive: true,
		interaction: {
			mode: "index" as const,
			intersect: false,
		},
		stacked: false,
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: any) =>
						`${context.dataset.label}: ${context.parsed.y} ${uof}`,
				},
			},
		},
		scales: {
			x: {
				type: "category" as const,
				title: {
					display: true,
					text: "Время",
				},
			},
			y: {
				type: "linear" as const,
				title: {
					display: true,
					text: xName,
				},
			},
		},
	};

	return <Line data={data} options={options} />;
};
