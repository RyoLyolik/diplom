import {
	Masthead,
	MastheadMain,
	MastheadBrand,
	MastheadLogo,
	MastheadContent,
	Button,
	Flex,
	FlexItem,
} from "@patternfly/react-core";
import { useAuth } from "../../hooks";
import { Link, Outlet, useNavigate } from "react-router";

export function Header() {
	const { logout, user } = useAuth();
	let navigate = useNavigate();

	return (
		<>
			<Masthead>
				<MastheadMain>
					<MastheadBrand>
						<MastheadLogo>
							<span
								style={{
									fontWeight: "bolder",
									fontSize: "1rem",
								}}
							>
								{user?.isAdmin
									? "Админская панель"
									: "Панель сотрудника"}
							</span>{" "}
							({user?.email})
						</MastheadLogo>
					</MastheadBrand>
				</MastheadMain>
				<MastheadContent>
					<Flex style={{ width: "100%" }}>
						{!user?.isAdmin && (
							<>
								<FlexItem>
									<Link to="/power-supply">
										Мониторинг систем
									</Link>
								</FlexItem>
								<FlexItem>
									<Link to="/dashboard/power-supply">
										Дашборды
									</Link>
								</FlexItem>
								<FlexItem>
									<Link to="/incident">
										Список инцидентов
									</Link>
								</FlexItem>
								<FlexItem>
									<Link to="/report">Список отчетов</Link>
								</FlexItem>
							</>
						)}
						<FlexItem align={{ default: "alignRight" }}>
							<Button
								variant="danger"
								onClick={async () => {
									logout();
									navigate("/auth/login");
								}}
							>
								Выйти
							</Button>
						</FlexItem>
					</Flex>
				</MastheadContent>
			</Masthead>
			<Outlet />
		</>
	);
}
