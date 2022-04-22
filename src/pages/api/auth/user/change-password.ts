import { connectToDb } from "helpers/db.helpers";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

import { verifyPassword, hashPassword } from "helpers/auth.helpers";

export interface ChangePasswordResponse {
	message: string;
}

const handler: NextApiHandler<ChangePasswordResponse> = async (req, res) => {
	if (req.method !== "PATCH") {
		res.status(405).end();
		return;
	}

	const session = await getSession({ req });

	if (!session) {
		res.status(401).json({ message: "Not authenticated!" });
		return;
	}

	const userEmail = session.user?.email;
	const { oldPassword, newPassword } = req.body;

	try {
		const client = await connectToDb();
		const usersCollection = client.db().collection("users");

		const user = await usersCollection.findOne({ email: userEmail });

		if (!user) {
			res.status(404).json({ message: "User not found." });
			client.close();
			return;
		}

		const passwordsIsValid = verifyPassword(oldPassword, user.password);

		if (!passwordsIsValid) {
			res.status(422).json({ message: "Invalid password." });
			client.close();
			return;
		}

		await usersCollection.updateOne(
			{ email: userEmail },
			{
				$set: {
					password: await hashPassword(newPassword),
				},
			}
		);

		client.close();
		res.status(200).json({ message: "Password updated." });
	} catch (error) {}
};

export default handler;
