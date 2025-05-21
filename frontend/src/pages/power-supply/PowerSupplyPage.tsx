import { Divider, Flex, FlexItem } from "@patternfly/react-core";
import { PowerSupplyContextProvider } from "../../hooks";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import _ from "lodash";
import { DGU } from "./Elements/DGU";
import { GRSCH } from "./Elements/GRSCH";
import { IBP } from "./Elements/IBP";
import { SCHR } from "./Elements/SCHR";
import { PDU } from "./Elements/PDU";
import { Link } from "react-router";
import { PowerSupplyIcon, RefrigerationIcon } from "../../components";

export function PowerSupplyPage() {
	useEffect(() => {
		//if (!isConnected) toast.error("Не удалось соединиться с сервером!");
	}, []);

	return (
		<div>
			<Flex
				direction={{ default: "row" }}
				alignItems={{ default: "alignItemsCenter" }}
				justifyContent={{ default: "justifyContentCenter" }}
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
				<img src="/power-supply-img.png" alt="Схема энергоснабжения" />
				<PowerSupplyContextProvider>
					<DGU index={0} poz={{ x: 1, y: 260, w: 100, h: 80 }} />
					<DGU index={1} poz={{ x: 1, y: 407, w: 100, h: 80 }} />

					<GRSCH index={0} poz={{ x: 115, y: 260, w: 100, h: 80 }} />
					<GRSCH index={1} poz={{ x: 115, y: 407, w: 100, h: 80 }} />

					<IBP
						index={0}
						poz={{ x: 275, y: 260, w: 70, h: 105, fontSize: 10 }}
					/>
					<IBP
						index={1}
						poz={{ x: 275, y: 407, w: 70, h: 105, fontSize: 10 }}
					/>

					<SCHR
						index={0}
						poz={{ x: 448, y: 115, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={1}
						poz={{ x: 448, y: 260, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={3}
						poz={{ x: 448, y: 405, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={2}
						poz={{ x: 448, y: 550, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={4}
						poz={{ x: 1373, y: 115, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={5}
						poz={{ x: 1373, y: 260, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={6}
						poz={{ x: 1373, y: 405, w: 70, h: 105, fontSize: 10 }}
					/>
					<SCHR
						index={7}
						poz={{ x: 1373, y: 550, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={0}
						poz={{ x: 625, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={1}
						poz={{ x: 625, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={2}
						poz={{ x: 625, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={3}
						poz={{ x: 625, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={4}
						poz={{ x: 625, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={5}
						poz={{ x: 625, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={6}
						poz={{ x: 625, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={7}
						poz={{ x: 625, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={8}
						poz={{ x: 725, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={9}
						poz={{ x: 725, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={10}
						poz={{ x: 725, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={11}
						poz={{ x: 725, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={12}
						poz={{ x: 725, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={13}
						poz={{ x: 725, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={14}
						poz={{ x: 725, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={15}
						poz={{ x: 725, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={16}
						poz={{ x: 820, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={17}
						poz={{ x: 820, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={18}
						poz={{ x: 820, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={19}
						poz={{ x: 820, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={20}
						poz={{ x: 820, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={21}
						poz={{ x: 820, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={22}
						poz={{ x: 820, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={23}
						poz={{ x: 820, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={24}
						poz={{ x: 917, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={25}
						poz={{ x: 917, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={26}
						poz={{ x: 917, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={27}
						poz={{ x: 917, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={28}
						poz={{ x: 917, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={29}
						poz={{ x: 917, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={30}
						poz={{ x: 917, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={31}
						poz={{ x: 917, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={32}
						poz={{ x: 1015, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={33}
						poz={{ x: 1015, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={34}
						poz={{ x: 1015, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={35}
						poz={{ x: 1015, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={36}
						poz={{ x: 1015, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={37}
						poz={{ x: 1015, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={38}
						poz={{ x: 1015, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={39}
						poz={{ x: 1015, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={40}
						poz={{ x: 1112, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={41}
						poz={{ x: 1112, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={42}
						poz={{ x: 1112, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={43}
						poz={{ x: 1112, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={44}
						poz={{ x: 1112, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={45}
						poz={{ x: 1112, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={46}
						poz={{ x: 1112, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={47}
						poz={{ x: 1112, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={48}
						poz={{ x: 1210, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={49}
						poz={{ x: 1210, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={50}
						poz={{ x: 1210, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={51}
						poz={{ x: 1210, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={52}
						poz={{ x: 1210, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={53}
						poz={{ x: 1210, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={54}
						poz={{ x: 1210, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={55}
						poz={{ x: 1210, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>

					<PDU
						index={56}
						poz={{ x: 1305, y: 30, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={57}
						poz={{ x: 1305, y: 100, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={58}
						poz={{ x: 1305, y: 175, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={59}
						poz={{ x: 1305, y: 245, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={60}
						poz={{ x: 1305, y: 310, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={61}
						poz={{ x: 1305, y: 390, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={62}
						poz={{ x: 1305, y: 465, w: 70, h: 105, fontSize: 10 }}
					/>
					<PDU
						index={63}
						poz={{ x: 1305, y: 540, w: 70, h: 105, fontSize: 10 }}
					/>
				</PowerSupplyContextProvider>
			</div>
		</div>
	);
}
