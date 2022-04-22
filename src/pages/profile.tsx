import type {
	GetServerSidePropsContext,
	NextPage,
	InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";

import UserProfile from "components/profile/UserProfile/UserProfile";

const ProfilePage: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
	return <UserProfile />;
};

export default ProfilePage;

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession({ req: context.req });
	console.log(session);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanant: false,
			},
		};
	}

	return {
		props: {},
	};
};
