import { Card, CardTitle, CardBody, Flex } from "@patternfly/react-core";

export interface RefridgerationDashBoardElementProps {
	title: string;
	children: React.ReactNode;
}
export const Element = ({
	title,
	children,
}: RefridgerationDashBoardElementProps) => (
	<Card ouiaId="BasicCard">
		<CardTitle>{title}</CardTitle>
		<CardBody>
			<Flex
				direction={{ default: "row" }}
				flexWrap={{ default: "wrap" }}
				gap={{ default: "gapXs" }}
				justifyContent={{ default: "justifyContentSpaceAround" }}
			>
				{children}
			</Flex>
		</CardBody>
	</Card>
);
