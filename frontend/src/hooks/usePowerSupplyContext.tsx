import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useWebSocket } from "./useWebSocket";
import _ from "lodash";

interface PowerSupplyContextValue {
	info: PowerSupplyData;
	isConnected: boolean;
}

interface PowerSupplyData {
	GRSCH: Array<{
		voltage?: string;
		activePower?: string;
		coefficient?: string;
	}>;
	DGU: Array<{
		voltage?: string;
		activePower?: string;
		coefficient?: string;
		fuel?: string;
	}>;
	IBP: Array<{
		voltage?: string;
		activePower?: string;
		coefficient?: string;
		charge?: string;
		load?: string;
	}>;
	SCHR: Array<{
		voltage?: string;
		activePower?: string;
		coefficient?: string;
	}>;

	PDU: Array<{
		voltage?: string;
		current?: string;
	}>;
}

const PowerSupplyContext = React.createContext<
	PowerSupplyContextValue | undefined
>(undefined);

export function PowerSupplyContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { messages, isConnected } = useWebSocket(
		process.env.REACT_APP_WS_URL!
	);

	const [info, setInfo] = useState<PowerSupplyData>({
		GRSCH: [],
		DGU: [],
		IBP: [],
		SCHR: [],
		PDU: [],
	});

	useEffect(() => {
		if (!!messages.length) {
			const lastMessage = messages.pop();

			const lastMessageType = lastMessage["type"];
			if (_.includes(Object.keys(info), lastMessageType)) {
				setInfo((prev) => ({
					...prev,
					[lastMessageType]: lastMessage.data,
				}));
			}
		}
	}, [messages]);

	return (
		<PowerSupplyContext.Provider value={{ info, isConnected }}>
			{children}
		</PowerSupplyContext.Provider>
	);
}

export const usePowerSupplyContext = (): PowerSupplyContextValue => {
	const context = useContext(PowerSupplyContext);
	if (context === undefined) {
		throw new Error(
			"usePowerSupplyContext must be used within a PowerSupplyContextProvider"
		);
	}
	return {
		...context,
	};
};
