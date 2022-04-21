import type { NextApiHandler } from "next";

import { connectToDb } from "helpers/db.helpers";
import { hashPassword } from "helpers/auth.helpers";
import { MongoClient } from "mongodb";

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

	let client: MongoClient;
	try {
		client = await connectToDb();
	} catch (error) {
		let message = "Something went wronga";
		if (typeof error === "string") {
			message = error;
		} else if (error instanceof Error) {
			message = error.message;
		}
		res.status(500).json({ message });
		return;
	}
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

	client.close();
};

export default handler;
