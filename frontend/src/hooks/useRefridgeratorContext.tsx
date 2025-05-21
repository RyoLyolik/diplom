import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useWebSocket } from "./useWebSocket";
import _ from "lodash";

interface RefridgeratorContextValue {
	info: PowerSupplyData;
	isConnected: boolean;
}

interface PowerSupplyData {
	hot: Array<{
		temperature?: string;
		humidity?: string;
	}>;
	cold: Array<{
		temperature?: string;
		humidity?: string;
	}>;
	conditioner: Array<{
		temperature?: string;
	}>;
	chiller: Array<{
		temperatureIn?: string;
		temperatureOut?: string;
	}>;
}

const RefridgeratorContext = React.createContext<
	RefridgeratorContextValue | undefined
>(undefined);

export function RefridgeratorContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { messages, isConnected } = useWebSocket(
		process.env.REACT_APP_WS_URL!
	);

	const [info, setInfo] = useState<PowerSupplyData>({
		hot: [],
		cold: [],
		conditioner: [],
		chiller: [],
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
		<RefridgeratorContext.Provider value={{ info, isConnected }}>
			{children}
		</RefridgeratorContext.Provider>
	);
}

export const useRefridgeratorContext = (): RefridgeratorContextValue => {
	const context = useContext(RefridgeratorContext);
	if (context === undefined) {
		throw new Error(
			"useRefridgeratorContext must be used within a useRefridgeratorContext"
		);
	}
	return {
		...context,
	};
};
