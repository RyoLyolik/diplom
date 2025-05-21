import { Card, CardTitle, CardBody, Flex } from "@patternfly/react-core";

export interface PowerSupplyDashBoardElementProps {
	title: string;
	children: React.ReactNode;
}
export const Element = ({
	title,
	children,
}: PowerSupplyDashBoardElementProps) => (
	<Card ouiaId="BasicCard">
		<CardTitle>{title}</CardTitle>
		<CardBody style={{height: "100%", overflow: "auto"}}>
			<Flex
				direction={{ default: "row" }}
				flexWrap={{ default: "wrap" }}
				gap={{ default: "gapXs" }}
				justifyContent={{ default: "justifyContentSpaceAround" }}
				alignItems={{ default: "alignItemsStretch" }}
				alignContent={{ default: "alignContentStretch" }} 
			>
				{children}
			</Flex>
		</CardBody>
	</Card>
);
