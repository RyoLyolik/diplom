import { Divider, FlexItem } from "@patternfly/react-core";
import { PowerSupplyElementsProps, Element } from "./Element";
import { usePowerSupplyContext } from "../../../hooks";
import _ from "lodash";
import { useState } from "react";
import { dataService, GetChartResponseType } from "../../../api";
import toast from "react-hot-toast";
import { ChartModal } from "./ChartModal";

export function PDU({ poz, index }: PowerSupplyElementsProps) {
	const { info } = usePowerSupplyContext();

	const currentInfo = info.PDU[index];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chartsData, setChartData] = useState<GetChartResponseType | null>();

	const showCharts = async () => {
		setIsModalOpen(!isModalOpen);
		try {
			const response = await dataService.getChartData({
				parameter: "PDU",
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
					title={`Показатели для элемента PDU на позиции ${index}`}
				/>
			)}
			<FlexItem>
				U:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.voltage
						? _.round(Number(currentInfo?.voltage), 1)
						: "..."}
				</span>
			</FlexItem>
			<FlexItem>
				I:{" "}
				<span style={{ fontWeight: "bolder" }}>
					{currentInfo?.current
						? _.round(Number(currentInfo?.current), 2)
						: "..."}
				</span>
			</FlexItem>
		</Element>
	);
}
