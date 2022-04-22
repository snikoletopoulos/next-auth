import axios from "axios";

import { axiosErrorMessage } from "helpers/axios.helpers";
import { ChangePasswordResponse } from "pages/api/auth/user/change-password";

export const changePassword = async (
	oldPassword: string,
	newPassword: string
) => {
	try {
		const response = await axios.patch<ChangePasswordResponse>(
			"/api/user/change-password",
			{
				oldPassword,
				newPassword,
			}
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw axiosErrorMessage(error);
		} else {
			throw error;
		}
	}
};
