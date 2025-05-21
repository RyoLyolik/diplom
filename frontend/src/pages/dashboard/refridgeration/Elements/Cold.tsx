import { Element } from "./Element";

export function Cold() {
	return (
		<Element title="Холодные коридоры">
			<iframe
				src="http://localhost:3000/d-solo/bejs6ey50t7nkx/holodnye-koridory?orgId=1&from=1745684998856&to=1745706598856&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
				width="810"
				height="200"
				style={{ minHeight: "500px", border: "none" }}
			></iframe>

			<iframe
				src="http://localhost:3000/d-solo/bejs6ey50t7nkx/holodnye-koridory?orgId=1&from=1745684998856&to=1745706598856&timezone=browser&panelId=2&__feature.dashboardSceneSolo"
				width="810"
				height="200"
				style={{ minHeight: "500px", border: "none" }}
			></iframe>
		</Element>
	);
}
