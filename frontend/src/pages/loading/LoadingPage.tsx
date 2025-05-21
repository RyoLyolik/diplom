import { Spinner } from "@patternfly/react-core";
import { CenterLayout } from "../../components";

type LoadingPageProps = {
	text: string;
	diameter: string;
};

export function LoadingPage(props: Partial<LoadingPageProps>) {
	return (
		<CenterLayout>
			<Spinner diameter={props.diameter && "80px"} />
			<span>{props.text}</span>
		</CenterLayout>
	);
}
