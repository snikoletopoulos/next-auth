import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDb } from "helpers/db.helpers";
import { verifyPassword } from "helpers/auth.helpers";

export default NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Email",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials, req) {
				if (!credentials) {
					throw new Error("No credentials");
				}

				const client = await connectToDb();
				const userCollection = client.db().collection("users");

				const user = await userCollection.findOne({ email: credentials.email });

				if (!user) {
					client.close();
					throw new Error("Invalid credentials");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					client.close();
					throw new Error("Invalid credentials");
				}

				client.close();
				return {
					email: user.email,
				};
			},
		}),
	],
});
