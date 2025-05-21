import { Element } from "./Element";

export function Hot() {
	return (
		<Element title="Горячие коридоры">
			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74z/gorjachie-koridory?orgId=1&from=1745685028223&to=1745706628223&timezone=browser&panelId=4&__feature.dashboardSceneSolo"
				width="800"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/fejrw079ckw74z/gorjachie-koridory?orgId=1&from=1745685028223&to=1745706628223&timezone=browser&panelId=3&__feature.dashboardSceneSolo"
				width="800"
				height="200"
				style={{ minHeight: "300px", border: "none" }}
			></iframe>
		</Element>
	);
}
