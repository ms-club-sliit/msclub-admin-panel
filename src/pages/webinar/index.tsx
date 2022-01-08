import React, {useState, useEffect} from "react";
import RichTextEditor from "react-rte";
import {useDispatch, useSelector} from "react-redux";
import { ToolBarConfig } from "../../constants";
import { createWebinar, getWebinars } from "../../store/webinar-store/webinarActions";
import { IwebinarFormData, IWebinarState } from "../../interfaces";

let formData: IwebinarFormData ={
title: null,
description: null,
imageUrl: null,
dateTime: null,
tags: null,
link: null,
registrationLink: null,
webinarType: null,
};

const initialState: IWebinarState = {
    webinarId: "",
    isFormNotValid: false,
    title: "",
    description: "",
    imageUrl: "",
    dateTime: "",
    tags: [],
    link: "",
    registrationLink: "",
    webinarType: "",
};

const AddWebinar: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.webinarReducer);
    const [editor, setEditor] = useState(() => RichTextEditor.createEmptyValue());
    const [
        {
            title,
            description,
            imageUrl,
            dateTime,
            tags,
            link,
            registrationLink,
            webinarType,
        },
        setState,
    ] = useState(initialState);

    useEffect(() =>{
        dispatch(getWebinars());
        closeModal();
    }, [state.addWebinar, dispatch]); //  ******* //

    const closeModal = () =>{
        setState({...initialState});
        setEditor(RichTextEditor.createEmptyValue());
        $("#addWebinarModel").modal("hide");
    };

    const onChange = (webinar: any) => {
        const {name, value} = webinar.target;
        setState((prevState) => ({...prevState, [name]: value}));
    };

    const handleImage = (data: any) =>{
        setState((prevState) => ({...prevState, imageUrl: data}));
    };

    const handleDescription = (value: any) =>{
        setEditor(value);
        const isEmpty = !value.getEditorState().getCurrentContent().getPlainText().trim();

        if(isEmpty) {
            setState((prevState) =>({
                ...prevState,
                description: null,
            }));
        }
        else {
            setState((prevState) =>({
                ...prevState,
                description: value.toString("html"),
            }));
        }
    };

    const handleTags = (value: string) => {
        let tags = value.split(",");
        let filterdTags: string[] = [];

        if(tags.length > 0){
            for(let tag of tags){
                filterdTags.push(tag.trim());
            }
            console.log(filterdTags);
            setState((prevState) => ({...prevState, filteredTags: filterdTags}));
            console.log(filterdTags);
        }
    };

    //Form validation
    const validateForm = () =>{
        const data = {
            title: title && title.trim().length > 0 ? title : null,
            description: description && description.trim().length > 0 ? description : null,
            imageUrl: imageUrl ? imageUrl : null,
            dateTime: dateTime && dateTime.trim().length > 0 ? dateTime : null,
            tags: tags && tags.length > 0 ? tags : null,
            link: link && link.trim().length > 0 ? link : null,
            registrationLink: registrationLink && registrationLink.trim().length > 0 ? registrationLink : null,
            webinarType: webinarType && webinarType.trim().length > 0 ? webinarType : null,
        };

        formData = Object.assign({}, data);
        return true;
    };

    //Form Submission
    const onSubmit = (webinar : any) =>{
        webinar.preventDefault();

        const isFormValid = validateForm();

        if(isFormValid){
            let data = Object.values(formData).map((item) =>{
                return item !== null;
            });

            if(!data.includes(false)) {
                setState((prevState) => ({...prevState, isFormValid: false}));

                let webinarFormData = new FormData();
                webinarFormData.append("webinarFlyer", imageUrl);
                webinarFormData.append("title", title as string);
                webinarFormData.append("description", description as string);
                webinarFormData.append("dateTime", dateTime as string);
                tags?.forEach((tag) => webinarFormData.append("tags", tag));
                webinarFormData.append("link", link as string);
                webinarFormData.append("registrationLink", registrationLink as string);
                webinarFormData.append("webinarType", webinarType as string);

                dispatch(createWebinar(webinarFormData)); // *******//
            }
            else {
                setState((prevState) => ({...prevState, isFormValid: true}));
            }
        }
    };

    return ();

};

export default AddWebinar;
