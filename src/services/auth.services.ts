import axios from "axios";
import { Response as SignupResponse } from "pages/api/auth/signup";

export const createUser = async (email: string, password: string) => {
	try {
		const response = await axios.post<SignupResponse>("/api/auth/signup", {
			email,
			password,
		});

		return response.data;
	} catch (error) {
		throw new Error("Something went wrong");
	}
};
