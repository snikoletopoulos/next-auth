import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
	Redirect,
} from "next";

import AuthForm from "components/auth/AuthForm/AuthForm";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const AuthPage: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	return <AuthForm />;
};

export default AuthPage;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: "/profile",
				permanent: false,
			} as Redirect,
		};
	}

	return {
		props: {},
	};
};
