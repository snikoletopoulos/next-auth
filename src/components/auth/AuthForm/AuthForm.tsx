import { useState } from "react";
import styles from "./AuthForm.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "services/auth.services";

const AuthForm: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	const switchAuthModeHandler = () => {
		setIsLogin(prevState => !prevState);
	};

	const authForm = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Required"),
			password: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Required"),
		}),
		onSubmit: async ({ email, password }) => {
			if (isLogin) {
				console.log("Login");
			} else {
				try {
					const result = await createUser(email, password);

					console.log(result);
				} catch (error) {
					console.error(error);
				}
			}
		},
	});

	return (
		<section className={styles.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={authForm.handleSubmit}>
				<div className={styles.control}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						id="email"
						required
						{...authForm.getFieldProps("email")}
					/>
				</div>
				<div className={styles.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						{...authForm.getFieldProps("email")}
					/>
				</div>
				<div className={styles.actions}>
					<button>{isLogin ? "Login" : "Create Account"}</button>
					<button
						type="button"
						className={styles.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
