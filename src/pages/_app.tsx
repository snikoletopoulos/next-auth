import "styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "components/layout/Layout";
import { SessionProvider } from "next-auth/react";

const MyApp: React.FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
};

export default MyApp;
