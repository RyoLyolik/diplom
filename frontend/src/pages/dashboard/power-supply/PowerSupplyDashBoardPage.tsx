import { Link } from "react-router";
import { PowerSupplyIcon, RefrigerationIcon } from "../../../components";
import { GRSCH } from "./Elements/GRSCH";
import { Divider, Flex } from "@patternfly/react-core";
import { DGU } from "./Elements/DGU";
import { IBP } from "./Elements/IBP";
import { PDU } from "./Elements/PDU";
import { SCHR } from "./Elements/SCHR";

export function PowerSupplyDashBoardPage() {
	return (
		<>
			<Flex
				direction={{ default: "row" }}
				style={{
					width: "100vw",
					marginTop: "30px",
					marginBottom: "30px",
					padding: "0 20px",
					boxSizing: "border-box",
				}}
			>
				<Link
					to="/dashboard/power-supply"
					style={{
						flexGrow: 1,
						textAlign: "center",
						backgroundColor: "#3D6229",
						color: "#E0F4FF",
						padding: "15px 10px",
						textDecoration: "none",
						borderRadius: "8px 0 0 8px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
						transition: "background-color 0.3s ease",
						boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
					}}
				>
					<PowerSupplyIcon
						color="#E0F4FF"
						style={{ width: "24px", height: "24px" }}
					/>
					<span>Электроснабжение</span>
				</Link>

				<Divider
					orientation={{
						default: "vertical",
					}}
				/>

				<Link
					to="/dashboard/refridgeration"
					style={{
						flexGrow: 1,
						textAlign: "center",
						backgroundColor: "#1C2D47",
						color: "#D9F0FF",
						padding: "15px 10px",
						textDecoration: "none",
						borderRadius: "0 8px 8px 0",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
						transition: "background-color 0.3s ease",
						boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
					}}
				>
					<RefrigerationIcon
						color="#D9F0FF"
						style={{ width: "24px", height: "24px" }}
					/>
					<span>Холодоснабжение</span>
				</Link>
			</Flex>
			<Flex direction={{ default: "column" }} gap={{ default: "gapLg" }}>
				<GRSCH />
				<DGU />
				<IBP />
				<PDU />
				<SCHR /> 
			</Flex>
		</>
	);
}
