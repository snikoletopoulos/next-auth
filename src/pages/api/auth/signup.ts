import type { NextApiHandler } from "next";

import { connectToDb } from "helpers/db";
import { hashPassword } from "helpers/auth";

export interface Response {
	message: string;
}

const handler: NextApiHandler<Response> = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).end();
		return;
	}

	const data = req.body;

	const { email, password } = data;

	if (!email || !email.includes("@") || !password || password.length < 5) {
		res.status(422).json({ message: "Invalid input" });
		return;
	}

	const client = await connectToDb();
	const db = client.db();

	const collection = db.collection("users");

	const existingUser = await collection.findOne({ email });

	if (existingUser) {
		res.status(422).json({ message: "User already exists" });
		client.close();
		return;
	}

	const result = await collection.insertOne({
		email,
		password: await hashPassword(password),
	});

	res.status(201).json({ message: "User created" });

  client.close()
};

export default handler;
