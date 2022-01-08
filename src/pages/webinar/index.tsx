import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { ToolBarConfig } from "../../constants";
import { createWebinar } from "../../store/webinar-store/webinarActions";
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
    link: [],
    registrationLink: "",
    webinarType: "",
};

const AddWebinar: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.eve)
}


const index = () => {



    return (
        <div>
            
        </div>
    )
}

export default index
