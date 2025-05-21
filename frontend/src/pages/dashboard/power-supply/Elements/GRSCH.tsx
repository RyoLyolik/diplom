import { Element } from "./Element";

export function GRSCH() {
	return (
		<Element title="Главный распределительный щит">
			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74d/grsch?orgId=1&from=1745684738498&to=1745706338498&timezone=browser&panelId=4&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74d/grsch?orgId=1&from=1745684738498&to=1745706338498&timezone=browser&panelId=3&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74d/grsch?orgId=1&from=1745684738498&to=1745706338498&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>
		</Element>
	);
}
