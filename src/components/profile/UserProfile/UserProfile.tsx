import styles from "./UserProfile.module.css";

import ProfileForm from "components/profile/ProfileForm/ProfileForm";
import { changePassword } from "services/change-password.services";

const UserProfile: React.FC = () => {
	const handlePasswordChange = (oldPassword: string, newPassword: string) => {
		changePassword(oldPassword, newPassword);
	};

	return (
		<section className={styles.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm onChangePassword={handlePasswordChange} />
		</section>
	);
};

export default UserProfile;
