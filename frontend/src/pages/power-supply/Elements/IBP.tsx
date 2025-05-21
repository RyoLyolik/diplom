import { Divider, FlexItem } from "@patternfly/react-core";
import { PowerSupplyElementsProps, Element } from "./Element";
import { usePowerSupplyContext } from "../../../hooks";
import _ from "lodash";
import { useState } from "react";
import { dataService, GetChartResponseType } from "../../../api";
import toast from "react-hot-toast";
import { ChartModal } from "./ChartModal";

export function IBP({ poz, index }: PowerSupplyElementsProps) {
	const { info } = usePowerSupplyContext();

	const currentInfo = info.IBP[index];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chartsData, setChartData] = useState<GetChartResponseType | null>();

	const showCharts = async () => {
		setIsModalOpen(!isModalOpen);
		try {
			const response = await dataService.getChartData({
				parameter: "IBP",
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
					title={`Показатели для элемента ИБП на позиции ${index}`}
				/>
			)}
			<FlexItem>
				U:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.voltage
						? _.round(Number(currentInfo?.voltage), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				P:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.activePower
						? _.round(Number(currentInfo?.activePower), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				K:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.coefficient
						? _.round(Number(currentInfo?.coefficient), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				Заряд:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.charge
						? _.round(Number(currentInfo?.charge), 3)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				Нагрузка:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.load
						? _.round(Number(currentInfo?.load), 2)
						: "..."}
				</span>
			</FlexItem>
		</Element>
	);
}
