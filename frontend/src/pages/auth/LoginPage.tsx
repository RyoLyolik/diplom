import { Fragment, useState } from "react";
import {
	LoginForm,
	LoginMainFooterBandItem,
	LoginPage as PatternFlyLoginPage,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { authService } from "../../api";
import toast from "react-hot-toast";

export function LoginPage() {
	const [showHelperText, setShowHelperText] = useState(false);
	const [email, setEmail] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState("");
	const [isValidPassword, setIsValidPassword] = useState(true);

	let navigate = useNavigate();

	const handleUsernameChange = (
		_event: React.FormEvent<HTMLInputElement>,
		value: string
	) => {
		setEmail(value);
	};

	const handlePasswordChange = (
		_event: React.FormEvent<HTMLInputElement>,
		value: string
	) => {
		setPassword(value);
	};

	const onLoginButtonClick = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setIsValidEmail(!!email);
		setIsValidPassword(!!password);
		const isFormInvalid = !email || !password;
		setShowHelperText(isFormInvalid);
		if (!isFormInvalid) {
			const formData = {
				email,
				password,
			};
			try {
				const response = await authService.login(formData);
				if (response.data.status === "Ok") {
					Cookies.set("email", email);
					Cookies.set("password", password);

					toast.success("Вход прошел успешно!");

					navigate("/");
				} else {
					throw response;
				}
			} catch (e) {
				console.error("Ошибка при Входе: ", e);
				toast.error("Не удалось войти!");
			}
		}
	};

	const signUpForAccountMessage = (
		<LoginMainFooterBandItem>
			Вы не зарегистрированны?{" "}
			<Link to="/auth/register">Зарегистрироваться.</Link>
		</LoginMainFooterBandItem>
	);

	const loginForm = (
		<LoginForm
			showHelperText={showHelperText}
			helperText="Неверно введены данные."
			helperTextIcon={<ExclamationCircleIcon />}
			usernameLabel="Эл. почта"
			usernameValue={email}
			onChangeUsername={handleUsernameChange}
			isValidUsername={isValidEmail}
			passwordLabel="Пароль"
			passwordValue={password}
			onChangePassword={handlePasswordChange}
			isValidPassword={isValidPassword}
			onLoginButtonClick={onLoginButtonClick}
			loginButtonLabel="Войти"
		/>
	);

	return (
		<PatternFlyLoginPage
			loginTitle="Вход"
			loginSubtitle="Введите необходимые данные, чтобы войти как администатор или пользователь."
			signUpForAccountMessage={signUpForAccountMessage}
		>
			{loginForm}
		</PatternFlyLoginPage>
	);
}
