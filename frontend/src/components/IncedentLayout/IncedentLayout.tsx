import { useEffect, useState } from "react";
import { useWebSocket } from "../../hooks";
import {
	Alert,
	AlertActionCloseButton,
	AlertGroup,
	AlertProps,
	Button,
} from "@patternfly/react-core";
import { Outlet } from "react-router";
import _ from "lodash";
import { CreateIncidentParams, dataService } from "../../api";
import toast from "react-hot-toast";
import { CreateIncidentModal } from "../CreateIncidentModal";

export function IncedentLayout() {
	const { messages } = useWebSocket("ws://localhost:2114/ws/alert");

	const [alerts, setAlerts] = useState<Array<AlertProps & { desc: string }>>(
		[]
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCreateIncident = async (params: CreateIncidentParams) => {
		await dataService.createIncident(params);
		toast.success("Инцидент создан!");
	};

	useEffect(() => {
		if (messages.length > 0) {
			const newMessage = messages.pop();

			setAlerts((prev) => [
				...prev,
				{
					title: newMessage?.Title,
					key: new Date().getTime(),
					desc: newMessage?.Detail,
				},
			]);
		}
	}, [messages]);

	const removeAlert = (key: React.Key) => {
		setAlerts((prevAlerts) => [
			...prevAlerts.filter((alert) => alert.key !== key),
		]);
	};

	return (
		<>
			<CreateIncidentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreateIncident}
			/>
			<AlertGroup hasAnimations isToast isLiveRegion>
				{alerts.map(({ key, title, desc }) => (
					<Alert
						variant="danger"
						title={title}
						actionClose={
							<AlertActionCloseButton
								title={title as string}
								onClose={() => removeAlert(key!)}
							/>
						}
						key={key}
						timeout
						actionLinks={[
							<Button
								size="sm"
								variant="warning"
								onClick={() => setIsModalOpen(true)}
								key={"Button-" + key}
							>
								Завести инцидент
							</Button>,
						]}
					>
						<span style={{ marginBottom: "10px" }}>{desc}</span>
					</Alert>
				))}
			</AlertGroup>
			<Outlet />
		</>
	);
}
