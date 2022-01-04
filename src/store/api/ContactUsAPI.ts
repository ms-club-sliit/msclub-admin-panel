import axios from "axios";
import requestConfig from "./config";
import { IContactUs } from "../../interfaces";
const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class ContactUsAPI {

    static getselectedContactUs(contactUsId: string): Promise<IContactUs> {
        return axios.get(`${BASE_URL}/admin/contactus/${contactUsId}`, requestConfig);
    }

    static getContactsUs(): Promise<IContactUs[]> {
        return axios.get(`${BASE_URL}/admin/contactus/`, requestConfig);
    }

    static deleteContactUs(contactUsId: string): Promise<IContactUs> {
        return axios.put(`${BASE_URL}/admin/contactus/delete/${contactUsId}`, {}, requestConfig);
    }
    static deleteContactsUs(): Promise<IContactUs[]> {
        return axios.get(`${BASE_URL}/admin/contactus/delete/`, requestConfig);
    }
}

export default ContactUsAPI;
