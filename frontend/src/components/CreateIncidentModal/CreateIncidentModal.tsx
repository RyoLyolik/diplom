import React, { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Form,
	FormGroup,
	ActionGroup,
	FileUpload,
	InputGroup,
	TextInput,
} from "@patternfly/react-core";
import { CreateIncidentParams } from "../../api";
import toast from "react-hot-toast";
import { DateTimePicker } from "../DateTimePicker";

interface CreateIncidentModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (params: CreateIncidentParams) => Promise<void>;
}

export const CreateIncidentModal: React.FunctionComponent<
	CreateIncidentModalProps
> = ({ isOpen, onClose, onSubmit }) => {
	const [title, setTitle] = useState<string>("");
	const [timestamp, setTimestamp] = useState<string>("");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isFileLoading, setFileIsLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!title || timestamp === "MM-DD-YYYYTHH:MM:00" || !file) {
			toast.error("Все поля обязательны");
			return;
		}

		if (isFileLoading) {
			toast.error("Дождитесь загрузки файла!");
			return;
		}

		setIsLoading(true);
		try {
			await onSubmit({ title, timestamp, file });
			resetForm();
			onClose();
		} catch (err) {
			console.error("Ошибка при создании инцидента:", err);
			toast.error("Не удалось отправить инцидент");
		} finally {
			setIsLoading(false);
		}
	};

	const resetForm = () => {
		setTitle("");
		setTimestamp("");
		setFile(undefined);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} variant="medium">
			<ModalHeader title="Создать инцидент" />
			<Form onSubmit={handleSubmit}>
				<ModalBody
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "30px",
					}}
				>
					<FormGroup
						label="Название"
						isRequired
						fieldId="incident-title"
					>
						<TextInput
							id="incident-title"
							value={title}
							onChange={(_e, val) => setTitle(val)}
							isRequired
						/>
					</FormGroup>

					<FormGroup
						label="Дата и время"
						isRequired
						fieldId="incident-datetime"
					>
						<DateTimePicker onChange={(val) => setTimestamp(val)} />
					</FormGroup>

					<FormGroup
						label="Файл отчета"
						isRequired
						fieldId="incident-file"
					>
						<FileUpload
							id="incident-file"
							value={file}
							filenamePlaceholder="Выберите файл"
							browseButtonText="Загрузить"
							clearButtonText="Убрать файл"
							onFileInputChange={(_, file) => {
								if (file.name.split(".")[1] !== "pdf") {
									toast.error(
										"Формат файла должен быть PDF!"
									);
									setFile(undefined);
								} else {
									setFile(file);
								}
							}}
							hideDefaultPreview
							filename={file?.name}
							onClearClick={() => setFile(undefined)}
							onReadStarted={() => setFileIsLoading(true)}
							onReadFinished={() => setFileIsLoading(false)}
							onReadFailed={(event, error) => {
								toast.error("Не удалось загрузить файл!");
								console.error(
									"Ошибка при загрузке файла: ",
									error
								);
							}}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					<ActionGroup>
						<Button
							type="submit"
							variant="primary"
							isLoading={isLoading}
						>
							Создать
						</Button>
						<Button
							variant="link"
							onClick={onClose}
							isDisabled={isLoading}
						>
							Отмена
						</Button>
					</ActionGroup>
				</ModalFooter>
			</Form>
		</Modal>
	);
};
