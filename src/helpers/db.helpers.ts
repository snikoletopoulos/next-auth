import { MongoClient } from "mongodb";

export const connectToDb = async () => {
	try {
		const client = MongoClient.connect(process.env.MONGO_URL ?? "");

		return client;
	} catch (error) {
		
	}
};
