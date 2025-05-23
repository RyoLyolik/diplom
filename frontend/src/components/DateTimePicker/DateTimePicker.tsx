import { useEffect, useState } from "react";
import {
	CalendarMonth,
	InputGroup,
	InputGroupItem,
	TextInput,
	Button,
	Popover,
	Dropdown,
	DropdownItem,
	DropdownList,
	MenuToggle,
	MenuToggleElement,
} from "@patternfly/react-core";
import OutlinedCalendarAltIcon from "@patternfly/react-icons/dist/esm/icons/outlined-calendar-alt-icon";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";

export const DateTimePicker = ({
	onChange,
}: {
	onChange: (val: string) => void;
}) => {
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isTimeOpen, setIsTimeOpen] = useState(false);
	const [valueDate, setValueDate] = useState("MM-DD-YYYY");
	const [valueTime, setValueTime] = useState("HH:MM");
	const times = Array.from(new Array(10), (_, i) => i + 8);
	const defaultTime = "0:00";
	const dateFormat = (date: Date) =>
		date
			.toLocaleDateString("ru-RU", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.replace(/\//g, "-");

	const onToggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
		setIsTimeOpen(false);
	};

	const onToggleTime = () => {
		setIsTimeOpen(!isTimeOpen);
		setIsCalendarOpen(false);
	};

	const onSelectCalendar = (
		_event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		newValueDate: Date
	) => {
		const newValue = dateFormat(newValueDate);
		setValueDate(newValue);
		setIsCalendarOpen(!isCalendarOpen);
		// setting default time when it is not picked
		if (valueTime === "HH:MM") {
			setValueTime(defaultTime);
		}
	};

	const onSelectTime = (
		ev: React.MouseEvent<Element, MouseEvent> | undefined
	) => {
		setValueTime(ev?.currentTarget?.textContent as string);
		setIsTimeOpen(!isTimeOpen);
	};

	const timeOptions = times.map((time) => (
		<DropdownItem key={time}>{`${time}:00`}</DropdownItem>
	));

	const calendar = (
		<CalendarMonth date={new Date(valueDate)} onChange={onSelectCalendar} />
	);

	const time = (
		<Dropdown
			onSelect={onSelectTime}
			isOpen={isTimeOpen}
			onOpenChange={(isOpen: boolean) => setIsTimeOpen(isOpen)}
			toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
				<MenuToggle
					ref={toggleRef}
					onClick={onToggleTime}
					isExpanded={isTimeOpen}
					aria-label="Time picker"
					icon={<OutlinedClockIcon />}
				/>
			)}
		>
			<DropdownList>{timeOptions}</DropdownList>
		</Dropdown>
	);

	const calendarButton = (
		<Button
			variant="control"
			aria-label="Toggle the calendar"
			onClick={onToggleCalendar}
			icon={<OutlinedCalendarAltIcon />}
		/>
	);

	useEffect(() => {
		const [day, month, year] = valueDate.split(".");
		const [h, m] = valueTime.split(":");
		onChange(`${year}-${month}-${day}` + "T" + `${h.length === 1 ? "0" + h : h}:${m}` + ":00");
	}, [valueDate, valueTime]);

	return (
		<div style={{ width: "300px" }}>
			<Popover
				position="bottom"
				bodyContent={calendar}
				showClose={false}
				isVisible={isCalendarOpen}
				hasNoPadding
				hasAutoWidth
			>
				<InputGroup>
					<InputGroupItem>
						<TextInput
							type="text"
							id="date-time"
							aria-label="date and time picker demo"
							value={valueDate + " " + valueTime}
							readOnlyVariant="default"
						/>
					</InputGroupItem>
					<InputGroupItem>{calendarButton}</InputGroupItem>
					<InputGroupItem>{time}</InputGroupItem>
				</InputGroup>
			</Popover>
		</div>
	);
};
