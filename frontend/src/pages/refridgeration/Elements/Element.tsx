import { Flex } from "@patternfly/react-core";

export type ElementsProps = {
	x: number;
	y: number;
	w?: number;
	h?: number;
	fontSize?: number;
	children: React.ReactNode;
	onClick: () => void;
};

export type RefridgeratorElementsProps = {
	poz: Omit<ElementsProps, "children" | "onClick">;
	index: number;
};

export function Element({
	children,
	x,
	y,
	w,
	h,
	fontSize,
	onClick,
}: ElementsProps) {
	return (
		<Flex
			style={{
				position: "absolute",
				left: `${x}px`,
				top: `${y}px`,
				width: w ? `${w}px` : "",
				height: h ? `${h}px` : "",
				// backgroundColor: "#121212",
				fontSize: fontSize ? `${fontSize}px` : "15px",
				color: "#4A9BFF",
				padding: "2px",
				borderRadius: "8px",
				// border: "1px solid #3D6229",
				cursor: "pointer",
			}}
			direction={{ default: "column" }}
			gap={{ default: "gapXs" }}
			justifyContent={{ default: "justifyContentFlexStart" }}
			onClick={onClick}
		>
			{children}
		</Flex>
	);
}
