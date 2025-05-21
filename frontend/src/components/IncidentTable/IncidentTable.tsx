import {
	DataList,
	DataListItem,
	DataListItemRow,
	DataListItemCells,
	DataListCell,
	Skeleton,
	Button,
} from "@patternfly/react-core";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dataService, GetIncidentListResponseType } from "../../api";

export function IncidentTable() {
	const [incidents, setIncidents] = useState<GetIncidentListResponseType>([]);
	const [isListLoading, setIsListLoading] = useState(true);

	const fetchIncidentList = async () => {
		setIsListLoading(true);
		try {
			const response = await dataService.getIncidentList();

			setIncidents(response.data);
		} catch (e) {
			console.error("Ошибка при получении списка инцидентов: ", e);
			toast.error("Ошибка при получении списка инцидентов");
		} finally {
			setIsListLoading(false);
		}
	};

	useEffect(() => {
		fetchIncidentList();
	}, []);

	const headers = ["ID", "Название", "Дата инцидента", "Действие"];

	const formatter = new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "UTC",
	});

	const handleDownloadReport = async (id: string) => {
		const response = await dataService.getIncidentFile(id);

		const href = URL.createObjectURL(response.data);

		const link = document.createElement("a");
		link.href = href;
		link.setAttribute("download", "incident.pdf");
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	};

	if (isListLoading) return <Skeleton />;

	return (
		<>
			<DataList aria-label="Simple data list example">
				<DataListItem>
					<DataListItemRow>
						<DataListItemCells
							dataListCells={headers.map((header, index) => (
								<DataListCell key={index}>
									{header}
								</DataListCell>
							))}
						/>
					</DataListItemRow>
				</DataListItem>
				{incidents.map((incident) => (
					<DataListItem key={"DataListItem-" + incident.id}>
						<DataListItemRow key={"DataListItemRow-" + incident.id}>
							<DataListItemCells
								key={"DataListItemCells-" + incident.id}
								dataListCells={[
									<DataListCell key={"id-" + incident.id}>
										{incident.id}
									</DataListCell>,
									<DataListCell key={"title-" + incident.id}>
										{incident.title}
									</DataListCell>,
									<DataListCell
										key={"timestamp-" + incident.id}
									>
										{formatter.format(
											new Date(incident.timestamp)
										)}
									</DataListCell>,
									<DataListCell key={"Button-" + incident.id}>
										<Button
											onClick={() =>
												handleDownloadReport(
													incident.id
												)
											}
										>
											Скачать отчет
										</Button>
									</DataListCell>,
								]}
							/>
						</DataListItemRow>
					</DataListItem>
				))}
			</DataList>
		</>
	);
}
