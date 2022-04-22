import styles from "./ProfileForm.module.css";

import { useFormik } from "formik";

interface Props {
	onChangePassword: (oldPassword: string, newPassword: string) => void;
}

const ProfileForm: React.FC<Props> = props => {
	const passwordForm = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
		},
		onSubmit: async values => {
			props.onChangePassword(values.oldPassword, values.newPassword);
		},
	});

	return (
		<form className={styles.form} onSubmit={passwordForm.handleSubmit}>
			<div className={styles.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					{...passwordForm.getFieldProps("newPassword")}
				/>
			</div>
			<div className={styles.control}>
				<label htmlFor="old-password">Old Password</label>
				<input
					type="password"
					id="old-password"
					{...passwordForm.getFieldProps("oldPassword")}
				/>
			</div>
			<div className={styles.action}>
				<button type="submit">Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
