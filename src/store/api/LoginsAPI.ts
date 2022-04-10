import axios from "axios";
import requestConfig from "./config";
import { IRecentLogin } from "../../interfaces/ILogins";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class LoginsAPI {
	static getLoginInfo(): Promise<IRecentLogin[]> {
		return axios.get(`${BASE_URL}/user/logins/`, requestConfig);
	}
}

export default LoginsAPI;
