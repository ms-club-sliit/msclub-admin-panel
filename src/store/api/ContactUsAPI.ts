import axios from "axios";
import requestConfig from "./config";
import { IContactUs } from "../../interfaces";
const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class ContactUsAPI{
    
    static createContactUs(contactData: IContactUs): Promise<IContactUs> {
        return axios.get(`${BASE_URL}/contactUs`, contactData, requestConfig);
    }

    static getselectedContactUsId(_id : string): Promise <IContactUs> {
        return axios.get(`${BASE_URL}/contactUs/${_id}`, requestConfig);
    }

    static getContactsUs(): Promise <IContactUs[]>{
        return axios.get(`${BASE_URL}/contactUs/`, requestConfig);
    }

    static deleteContactUs(_id : string): Promise <IContactUs> {
        return axios.put(`${BASE_URL}/contactUs/delete/${_id}`, requestConfig);
    }
    static deleteContactsUs(_id: string) : Promise <IContactUs[]> {
        return axios.put(`${BASE_URL}/contactUs/delete/`, requestConfig);
    }
}