import { FlexItem } from "@patternfly/react-core";
import { RefridgeratorElementsProps, Element } from "./Element";

import _ from "lodash";
import { useState } from "react";
import { dataService, GetChartResponseType } from "../../../api";
import toast from "react-hot-toast";
import { ChartModal } from "./ChartModal";
import { useRefridgeratorContext } from "../../../hooks/useRefridgeratorContext";

export function Chiller({ poz, index }: RefridgeratorElementsProps) {
	const { info } = useRefridgeratorContext();

	const currentInfo = info.chiller[index];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chartsData, setChartData] = useState<GetChartResponseType | null>();

	const showCharts = async () => {
		setIsModalOpen(!isModalOpen);
		try {
			const response = await dataService.getChartData({
				parameter: "chiller",
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
					title={`Показатели для элемента Чиллер на позиции ${index}`}
				/>
			)}
			<FlexItem>
				T_in:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.temperatureIn
						? _.round(Number(currentInfo?.temperatureIn), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				T_out:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.temperatureOut
						? _.round(Number(currentInfo?.temperatureOut), 3)
						: "..."}
				</span>
			</FlexItem>
		</Element>
	);
}
