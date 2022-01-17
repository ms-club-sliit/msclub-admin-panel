import axios from "axios";
import requestConfig from "./config";
import { IUser } from "../../interfaces";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class UserAPI {
	static createUser(userData: IUser): Promise<IUser> {
		return axios.post(`${BASE_URL}/user/`, userData, requestConfig);
	}

	static getUser(): Promise<IUser> {
		return axios.get(`${BASE_URL}/user/`, requestConfig);
	}

	static getAuthUser(): Promise<any> {
		return axios.get(`${BASE_URL}/user/auth/`, requestConfig);
	}

	static getAllUser(): Promise<IUser[]> {
		return axios.get(`${BASE_URL}/user/all/`, requestConfig);
	}

	static updateUser(data: IUser): Promise<IUser> {
		return axios.put(`${BASE_URL}/user/`, data, requestConfig);
	}

	static deleteUser(): Promise<IUser> {
		return axios.put(`${BASE_URL}/user/delete/`, requestConfig);
	}

	static login(userName: string, password: string): Promise<IUser> {
		let credentials = {
			userName: userName,
			password: password,
		};

		return axios.post(`${BASE_URL}/user/login/`, credentials);
	}
}

export default UserAPI;
