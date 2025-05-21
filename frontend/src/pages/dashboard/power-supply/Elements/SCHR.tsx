import { Element } from "./Element";

export function SCHR() {
	return (
		<Element title="Щит распределения">
			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74o/schr?orgId=1&from=1745684932864&to=1745706532864&timezone=browser&panelId=4&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74o/schr?orgId=1&from=1745684932864&to=1745706532864&timezone=browser&panelId=3&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74o/schr?orgId=1&from=1745684932864&to=1745706532864&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
				width="540"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>
		</Element>
	);
}
