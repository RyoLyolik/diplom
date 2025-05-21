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
} from "@patternfly/react-core";
import { Fragment, useEffect, useState } from "react";
import { adminService, EmployeeType } from "../../api";
import toast from "react-hot-toast";

export function EmployeeTable() {
	const [employee, setEmployee] = useState<EmployeeType[]>([]);
	const [isListLoading, setIsListLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchEmployeeList = async () => {
		setIsListLoading(true);
		try {
			const response = await adminService.getEmployeeList();
			if (response.data.status !== "Ok") {
				throw "Проблема с получением сотрудников";
			}

			setEmployee(response.data.data);
		} catch (e) {
			console.error("Ошибка при получении списка сотрудников: ", e);
			toast.error("Ошибка при получении списка сотрудников");
		} finally {
			setIsListLoading(false);
		}
	};

	useEffect(() => {
		fetchEmployeeList();
	}, [isModalOpen]);

	if (isListLoading) return <Skeleton />;

	const headers = ["ID", "Электронная почта", "Дата регистрации", "Роль"];

	const formatter = new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
	});

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
							dataListCells={headers.map((header) => (
								<DataListCell>{header}</DataListCell>
							))}
						/>
					</DataListItemRow>
				</DataListItem>
				{employee.map((emp) => (
					<DataListItem>
						<DataListItemRow>
							<DataListItemCells
								dataListCells={[
									<DataListCell>{emp.id}</DataListCell>,
									<DataListCell>{emp.email}</DataListCell>,
									<DataListCell>
										{formatter.format(
											new Date(emp.creation_date)
										)}
									</DataListCell>,
									<DataListCell>
										{emp.role.title}
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
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	const handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
		setIsModalOpen(!isModalOpen);
	};

	const handleEmployeeCreation = async (
		_event: KeyboardEvent | React.MouseEvent
	) => {
		try {
			const response = await adminService.createEmployee({
				email: emailValue,
				password: passwordValue,
			});
			if (response.data.status !== "Ok")
				throw "Ошибка при создании сотрудника";
			toast.success("Сотрудник успешно создан!");
		} catch (e) {
			console.error("Ошибка при создании пользователя: ", e);
			toast.error("Ошибка при создании сотрудника!");
		} finally {
			setIsModalOpen(!isModalOpen);
		}
	};

	const handleEmailInputChange = (
		event: React.FormEvent<HTMLInputElement>,
		value: string
	) => {
		setEmailValue(value);
	};
	const handlePasswordInputChange = (
		event: React.FormEvent<HTMLInputElement>,
		value: string
	) => {
		setPasswordValue(value);
	};

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
				Создать нового сотрудника
			</Button>
			<Modal
				variant={ModalVariant.small}
				isOpen={isModalOpen}
				onClose={handleModalToggle}
				aria-labelledby="form-modal-title"
				aria-describedby="modal-box-description-form"
			>
				<ModalHeader
					title="Создание нового сотрудника"
					description="Введите данные сотрудника, чтобы зарегистрировать его в системе."
					descriptorId="modal-box-description-form"
					labelId="form-modal-title"
				/>
				<ModalBody>
					<Form>
						<FormGroup
							label="Электронная почта"
							isRequired
							fieldId="new-employee-email"
						>
							<TextInput
								isRequired
								type="email"
								id="new-employee-email"
								name="new-employee-email"
								value={emailValue}
								onChange={handleEmailInputChange}
							/>
						</FormGroup>
						<FormGroup
							label="Пароль"
							isRequired
							fieldId="new-employee-password"
						>
							<TextInput
								isRequired
								type="text"
								id="new-employee-password"
								name="new-employee-password"
								value={passwordValue}
								onChange={handlePasswordInputChange}
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						key="create"
						variant="primary"
						form="modal-with-form-form"
						onClick={handleEmployeeCreation}
					>
						Подтвердить
					</Button>
					<Button
						key="cancel"
						variant="link"
						onClick={handleModalToggle}
					>
						Отмена
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};
