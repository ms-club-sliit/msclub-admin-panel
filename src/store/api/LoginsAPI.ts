import axios from "axios";
import requestConfig from "./config";
import { IRecentLogin } from "../../interfaces/ILogins";
import configs from "../../configs";

const BASE_URL = configs.api.baseUrl as string;

class LoginsAPI {
	static getLoginInfo(): Promise<IRecentLogin[]> {
		return axios.get(`${BASE_URL}/user/logins/`, requestConfig);
	}
}

export default LoginsAPI;
