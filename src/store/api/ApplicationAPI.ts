import axios from "axios";
import { IApplication } from "../../interfaces";
import requestConfig from "./config";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class ApplicationAPI {
  static createApplication(applicationData: IApplication): Promise<IApplication> {
    return axios.post(`${BASE_URL}/admin/application`, applicationData, requestConfig);
  }

  static getApplication(studentId: string): Promise<IApplication> {
    return axios.get(`${BASE_URL}/admin/application/${studentId}`, requestConfig);
  }

  static getApplications(): Promise<IApplication[]> {
    return axios.get(`${BASE_URL}/admin/application/`, requestConfig);
  }

  static getArchiveApplications(): Promise<IApplication> {
    return axios.get(`${BASE_URL}/admin/application/archive/`, requestConfig);
  }

  static updateApplication(studentId: string, data: FormData): Promise<IApplication> {
    return axios.put(`${BASE_URL}/admin/application/${studentId}`, data, requestConfig);
  }

  static deletedApplication(studentId: string): Promise<IApplication> {
    return axios.put(`${BASE_URL}/admin/application/delete/${studentId}`, null, requestConfig);
  }
}

export default ApplicationAPI;
