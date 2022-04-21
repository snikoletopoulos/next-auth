import { MongoClient } from "mongodb";

export const connectToDb = async () => {
	try {
		const client = await MongoClient.connect(process.env.MONGO_URL ?? "");

		if (!client) {
			throw new Error("Could not connect to database");
		}

		return client;
	} catch (error) {
		if (typeof error === "string") {
			throw new Error(error);
		} else if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Something went wrong");
	}
};
