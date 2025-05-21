import { Divider, Flex } from "@patternfly/react-core";
import { Link } from "react-router";
import { PowerSupplyIcon, RefrigerationIcon } from "../../components";
import { RefridgeratorContextProvider } from "../../hooks/useRefridgeratorContext";
import { Chiller } from "./Elements/Chiller";
import { Conditioner } from "./Elements/Conditioner";
import { Hot } from "./Elements/Hot";
import { Cold } from "./Elements/Cold";

export function RefridgerationPage() {
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
					to="/power-supply"
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
					to="/refridgeration"
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
			<div
				style={{
					position: "relative",
					width: "1500px",
					height: "1000px",
				}}
			>
				<img
					src="/refridgeration-img.png"
					alt="Схема холодоснабжения"
				/>
				<RefridgeratorContextProvider>
					<Chiller
						index={0}
						poz={{ x: 1, y: 345, w: 100, h: 80, fontSize: 15 }}
					/>

					<Chiller
						index={1}
						poz={{ x: 1, y: 570, w: 100, h: 80, fontSize: 15 }}
					/>
					<Conditioner index={0} poz={{ x: 210, y: 345, w: 100, h: 80, fontSize: 15 }}/>
					<Conditioner index={1} poz={{ x: 210, y: 570, w: 100, h: 80, fontSize: 15 }}/>

					<Hot index={0} poz={{ x: 505, y: 460, w: 100, h: 80 }}/>
					<Hot index={1} poz={{ x: 775, y: 460, w: 100, h: 80 }}/>
					<Hot index={2} poz={{ x: 1035, y: 460, w: 100, h: 80 }}/>
					<Hot index={3} poz={{ x: 1300, y: 460, w: 100, h: 80 }}/>

					<Cold index={0} poz={{ x:455, y:155, w:100, h:80 }}/>
					<Cold index={1} poz={{ x:565, y:155, w:100, h:80 }}/>
					<Cold index={2} poz={{ x:715, y:155, w:100, h:80 }}/>
					<Cold index={3} poz={{ x:830, y:155, w:100, h:80 }}/>
					<Cold index={4} poz={{ x:975, y:155, w:100, h:80 }}/>
					<Cold index={5} poz={{ x:1090, y:155, w:100, h:80 }}/>
					<Cold index={6} poz={{ x:1240, y:155, w:100, h:80 }}/>
					<Cold index={7} poz={{ x:1350, y:155, w:100, h:80 }}/>

					<Cold index={0+8} poz={{ x:455,  y:305, w:100, h:80 }}/>
					<Cold index={1+8} poz={{ x:565,  y:305, w:100, h:80 }}/>
					<Cold index={2+8} poz={{ x:715,  y:305, w:100, h:80 }}/>
					<Cold index={3+8} poz={{ x:830,  y:305, w:100, h:80 }}/>
					<Cold index={4+8} poz={{ x:975,  y:305, w:100, h:80 }}/>
					<Cold index={5+8} poz={{ x:1090, y:305, w:100, h:80 }}/>
					<Cold index={6+8} poz={{ x:1240, y:305, w:100, h:80 }}/>
					<Cold index={7+8} poz={{ x:1350, y:305, w:100, h:80 }}/>


					<Cold index={0+16} poz={{ x:455,  y:605, w:100, h:80 }}/>
					<Cold index={1+16} poz={{ x:565,  y:605, w:100, h:80 }}/>
					<Cold index={2+16} poz={{ x:715,  y:605, w:100, h:80 }}/>
					<Cold index={3+16} poz={{ x:830,  y:605, w:100, h:80 }}/>
					<Cold index={4+16} poz={{ x:975,  y:605, w:100, h:80 }}/>
					<Cold index={5+16} poz={{ x:1090, y:605, w:100, h:80 }}/>
					<Cold index={6+16} poz={{ x:1240, y:605, w:100, h:80 }}/>
					<Cold index={7+16} poz={{ x:1350, y:605, w:100, h:80 }}/>


					<Cold index={0+24} poz={{ x:455,  y:755, w:100, h:80 }}/>
					<Cold index={1+24} poz={{ x:565,  y:755, w:100, h:80 }}/>
					<Cold index={2+24} poz={{ x:715,  y:755, w:100, h:80 }}/>
					<Cold index={3+24} poz={{ x:830,  y:755, w:100, h:80 }}/>
					<Cold index={4+24} poz={{ x:975,  y:755, w:100, h:80 }}/>
					<Cold index={5+24} poz={{ x:1090, y:755, w:100, h:80 }}/>
					<Cold index={6+24} poz={{ x:1240, y:755, w:100, h:80 }}/>
					<Cold index={7+24} poz={{ x:1350, y:755, w:100, h:80 }}/>
				</RefridgeratorContextProvider>
			</div>
		</>
	);
}
