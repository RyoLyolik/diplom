import {
	DataList,
	DataListItem,
	DataListItemRow,
	DataListItemCells,
	DataListCell,
	Skeleton,
	Button,
	Form,
	FormGroup,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalVariant,
	TextInput,
	FormSelect,
	FormSelectOption,
} from "@patternfly/react-core";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	dataService,
	GetReportListResponseType,
	GroupingTypes,
} from "../../api";
import { DateTimePicker } from "../DateTimePicker";
import _ from "lodash";

export function ReportTable() {
	const [reports, setReports] = useState<GetReportListResponseType>([]);
	const [isListLoading, setIsListLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchReportList = async () => {
		setIsListLoading(true);
		try {
			const response = await dataService.getReportList();

			setReports(response.data);
		} catch (e) {
			console.error("Ошибка при получении списка отчетов: ", e);
			toast.error("Ошибка при получении списка отчетов");
		} finally {
			setIsListLoading(false);
		}
	};

	useEffect(() => {
		fetchReportList();
	}, [isModalOpen]);

	const headers = [
		"Название файла",
		"Размер файла",
		"Дата создания",
		"Действие",
	];

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

	const handleDownloadReport = async (filename: string) => {
		const response = await dataService.getReportFile(filename);

		const href = URL.createObjectURL(response.data);

		const link = document.createElement("a");
		link.href = href;
		link.setAttribute("download", "report.pdf");
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	};

	if (isListLoading) return <Skeleton />;

	return (
		<>
			<ModalWithForm
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
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
				{reports.map((report, index) => (
					<DataListItem key={"DataListItem-" + index}>
						<DataListItemRow key={"DataListItemRow-" + index}>
							<DataListItemCells
								key={"DataListItemCells-" + index}
								dataListCells={[
									<DataListCell key={"filename-" + index}>
										{report.filename}
									</DataListCell>,
									<DataListCell key={"size-" + index}>
										{_.round(report.size / 1000000, 3)} Мб
									</DataListCell>,
									<DataListCell
										key={"creation_date-" + index}
									>
										{formatter.format(
											new Date(report.creation_date)
										)}
									</DataListCell>,
									<DataListCell key={"Button-" + index}>
										<Button
											onClick={() =>
												handleDownloadReport(
													report.filename
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

interface ModalWithFormProps {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
}

const ModalWithForm = ({ isModalOpen, setIsModalOpen }: ModalWithFormProps) => {
	const [timefrom, setTimefrom] = useState("");
	const [timeto, setTimeto] = useState("");
	const [grouping, setGrouping] = useState<GroupingTypes>("hour");

	const [isLoading, setIsLoading] = useState(false);

	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleReportGeneration = async (
		_event: KeyboardEvent | React.MouseEvent
	) => {
		if (
			timefrom === "undefined-undefined-MM-DD-YYYYTHH:MM:00" ||
			timeto === "undefined-undefined-MM-DD-YYYYTHH:MM:00"
		) {
			toast.error("Не все поля введены!");

			return;
		}
		try {
			setIsLoading(true);
			await dataService.generateReport({
				timefrom,
				timeto,
				grouping,
			});

			toast.success("Отчет успешно сгенерирован!");
		} catch (e) {
			console.error("Ошибка при генерации отчета: ", e);
			toast.error("Ошибка при генерации отчета!");
		} finally {
			setIsModalOpen(!isModalOpen);
			setIsLoading(false);
		}
	};

	const handleGroupingInputChange = (
		event: React.FormEvent<HTMLSelectElement>,
		value: string
	) => {
		setGrouping(value as GroupingTypes);
	};

	const groupingOptions = [
		{
			value: "please choose",
			label: "Выберите один вариант",
			disabled: true,
		},
		{ value: "day", label: "День", disabled: false },
		{ value: "hour", label: "Час", disabled: false },
		{ value: "second", label: "Секунда", disabled: false },
		{ value: "minute", label: "Минута", disabled: false },
	];

	return (
		<Fragment>
			<Button
				variant="primary"
				style={{
					width: "100%",
					marginTop: "10px",
					marginBottom: "10px",
					paddingTop: "5px",
					paddingBottom: "5px",
				}}
				onClick={handleModalToggle}
			>
				Сгенерировать отчет
			</Button>
			<Modal
				variant={ModalVariant.small}
				isOpen={isModalOpen}
				onClose={() => {
					if (!isLoading) handleModalToggle();
				}}
				aria-labelledby="form-modal-title"
				aria-describedby="modal-box-description-form"
			>
				<ModalHeader
					title="Генерация отчета"
					labelId="form-modal-title"
				/>
				<ModalBody>
					<Form>
						<FormGroup
							label="Группировка"
							isRequired
							fieldId="new-report-grouping"
						>
							<FormSelect
								value={grouping}
								onChange={handleGroupingInputChange}
								aria-label="FormSelect Input"
								ouiaId="BasicFormSelect"
							>
								{groupingOptions.map((option, index) => (
									<FormSelectOption
										isDisabled={option.disabled}
										key={index}
										value={option.value}
										label={option.label}
									/>
								))}
							</FormSelect>
						</FormGroup>
						<FormGroup
							label="Дата и время начала"
							isRequired
							fieldId="new-report-timefrom"
						>
							<DateTimePicker
								onChange={(val) => setTimefrom(val)}
							/>
						</FormGroup>
						<FormGroup
							label="Дата и время окончания"
							isRequired
							fieldId="new-report-timeto"
						>
							<DateTimePicker
								onChange={(val) => setTimeto(val)}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						key="create"
						variant="primary"
						form="modal-with-form-form"
						onClick={handleReportGeneration}
						isLoading={isLoading}
						disabled={isLoading}
					>
						Подтвердить
					</Button>
					<Button
						key="cancel"
						variant="link"
						onClick={handleModalToggle}
						isLoading={isLoading}
						disabled={isLoading}
					>
						Отмена
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};
