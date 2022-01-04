import ContactUsActionTypes from "./contactUsActionTypes";
import ContactUsAPI from "../api/ContactUsAPI";

export const getselectedContactUs = (contactUsId: string) => {
    return {
        type: ContactUsActionTypes.GET_CONTACT,
        payload: ContactUsAPI.getselectedContactUs(contactUsId),
    };
};

export const getContactsUs = () => {
    return {
        type: ContactUsActionTypes.GET_ALL_CONTACTS,
        payload: ContactUsAPI.getContactsUs,
    };
};

export const deleteContactUs = (contactUsId: string) => {
    return {
        type: ContactUsActionTypes.DELETE_CONTACT,
        payload: ContactUsAPI.deleteContactUs(contactUsId),
    };
};

