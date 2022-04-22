import Link from "next/link";
import styles from "./MainNavigation.module.css";

import { useSession, signOut } from "next-auth/react";

const MainNavigation: React.FC = () => {
	const { data: session, status } = useSession();

	const handleLogOut = () => {
		signOut({
			redirect: false,
		});
	};

	return (
		<header className={styles.header}>
			<Link href="/">
				<a>
					<div className={styles.logo}>Next Auth</div>
				</a>
			</Link>
			<nav>
				<ul>
					{status !== "authenticated" && (
						<li>
							<Link href="/auth">Login</Link>
						</li>
					)}
					{status === "authenticated" && (
						<>
							<li>
								<Link href="/profile">Profile</Link>
							</li>
							<li>
								<button onClick={handleLogOut}>Logout</button>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
