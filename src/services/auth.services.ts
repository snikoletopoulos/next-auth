import axios from "axios";
import { Response as SignupResponse } from "pages/api/auth/signup";
import { axiosErrorMessage } from "helpers/axios.helpers";

export const createUser = async (email: string, password: string) => {
	try {
		const response = await axios.post<SignupResponse>("/api/auth/signup", {
			email,
			password,
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw axiosErrorMessage(error);
		} else {
			throw error;
		}
	}
};
