import axios from "axios";
import requestConfig from "./config";
import requestConfigJson from "./configJson";
import { IInquiry } from "../../interfaces";
const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class InquiryAPI {
	static getInquiries(): Promise<IInquiry[]> {
		return axios.get(`${BASE_URL}/admin/contact/`, requestConfig);
	}

	static deleteInquiry(inquiryId: string): Promise<IInquiry> {
		return axios.put(`${BASE_URL}/admin/contact/delete/${inquiryId}`, {}, requestConfig);
	}

	static getDeletedInquiries(): Promise<IInquiry[]> {
		return axios.get(`${BASE_URL}/admin/contact/delete/`, requestConfig);
	}

	static recoverDeletedInquiry(inquiryId: string): Promise<IInquiry> {
		return axios.put(`${BASE_URL}/admin/contact/recover/${inquiryId}`, {}, requestConfig);
	}
	static permanantDeletedInquiry(inquiryId: string): Promise<IInquiry> {
		return axios.delete(`${BASE_URL}/admin/contact/delete/${inquiryId}`, requestConfig);
	}

	static replyInquiry(inquiryId: string, data: any): Promise<IInquiry> {
		return axios.put(`${BASE_URL}/admin/contact/reply/${inquiryId}`, data, requestConfigJson);
	}
}

export default InquiryAPI;
