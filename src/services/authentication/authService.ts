import apiClient from "../../util/apiClient";

export interface SigningPayload {
    email: string;
    password: string;
}

export const signin = async (signinPayload: SigningPayload) => {
    try {
        const response = await apiClient.post("/api/auth/signin", signinPayload);

        if (response.data.status_code === 200) {
            return {
                user: response.data.user,
                token: response.data.token
            };
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                return "UNAUTHORIZED";
            } else {
                return "ERROR";
            }
        } else {
            return "ERROR";
        }
    }
};