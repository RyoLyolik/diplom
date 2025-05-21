import { FlexItem } from "@patternfly/react-core";
import { RefridgeratorElementsProps, Element } from "./Element";

import _ from "lodash";
import { useState } from "react";
import { dataService, GetChartResponseType } from "../../../api";
import toast from "react-hot-toast";
import { ChartModal } from "./ChartModal";
import { useRefridgeratorContext } from "../../../hooks/useRefridgeratorContext";

export function Hot({ poz, index }: RefridgeratorElementsProps) {
	const { info } = useRefridgeratorContext();

	const currentInfo = info.hot[index];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chartsData, setChartData] = useState<GetChartResponseType | null>();

	const showCharts = async () => {
		setIsModalOpen(!isModalOpen);
		try {
			const response = await dataService.getChartData({
				parameter: "cold",
				position: index,
			});
			setChartData(response.data);
		} catch (e) {
			console.error("Ошибка при получении графика: ", e);
			toast.error("Ошибка при получении графика");
		}
	};

	return (
		<Element {...poz} onClick={showCharts}>
			{chartsData && (
				<ChartModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					chartsData={chartsData}
					title={`Показатели для элемента Горячий коридор на позиции ${index}`}
				/>
			)}
			<FlexItem>
				T:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.temperature
						? _.round(Number(currentInfo?.temperature), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				ρ:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.humidity
						? _.round(Number(currentInfo?.humidity), 3)
						: "..."}
				</span>
			</FlexItem>
		</Element>
	);
}
