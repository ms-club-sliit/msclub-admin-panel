import LoginsActionTypes from "./loginsActionTypes";
import LoginsAPI from "../api/LoginsAPI";

export const getLoginInfo = () => {
	return {
		type: LoginsActionTypes.GET_LOGIN_INFO,
		payload: LoginsAPI.getLoginInfo(),
	};
};
