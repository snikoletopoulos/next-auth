import styles from "./UserProfile.module.css";

import ProfileForm from "components/profile/ProfileForm/ProfileForm";

const UserProfile: React.FC = () => {
	// Redirect away if NOT auth

	return (
		<section className={styles.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm />
		</section>
	);
};

export default UserProfile;
