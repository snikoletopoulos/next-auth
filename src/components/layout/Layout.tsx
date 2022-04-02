import MainNavigation from "components/layout/MainNavigation/MainNavigation";

const Layout: React.FC = props => {
	return (
		<>
			<MainNavigation />
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
