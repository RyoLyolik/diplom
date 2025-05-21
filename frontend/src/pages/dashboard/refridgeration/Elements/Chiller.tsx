import { Element } from "./Element";

export function Chiller() {
	return (
		<Element title="Чиллеры">
			<iframe
				src="http://localhost:3000/d-solo/eejsd8oxzplhcp/chiller?orgId=1&from=1745685077972&to=1745706677972&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
				width="800"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/eejsd8oxzplhcp/chiller?orgId=1&from=1745685077972&to=1745706677972&timezone=browser&panelId=2&__feature.dashboardSceneSolo"
				width="800"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>
		</Element>
	);
}
