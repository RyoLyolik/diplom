import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "@patternfly/react-core";

import { GetChartResponseType } from "../../../api";
import _ from "lodash";
import { Chart, ChartProps } from "../../../components/Chart/Chart";
import React from "react";

interface ChartModalProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	chartsData: GetChartResponseType;
}

export function ChartModal({
	isModalOpen,
	setIsModalOpen,
	title,
	chartsData,
}: ChartModalProps) {
	const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
		setIsModalOpen(!isModalOpen);
	};

	const charts: ChartProps[] = _.toPairs(chartsData.data).map((pair) => ({
		x: chartsData.times,
		y: pair[1].values.map((val) => Number(val)),
		uof: pair[1].uof,
		xName: pair[0],
	}));

	return (
		<Modal
			isOpen={isModalOpen}
			onClose={handleModalToggle}
			key={isModalOpen ? "modal-open" : "modal-closed"}
		>
			<ModalHeader title={title} />
			<ModalBody>
				{charts.map((chart, index) => (
					<React.Fragment key={index}>
						<Chart {...chart} />
					</React.Fragment>
				))}
			</ModalBody>
			<ModalFooter>
				<Button key="cancel" variant="link" onClick={handleModalToggle}>
					Закрыть
				</Button>
			</ModalFooter>
		</Modal>
	);
}
