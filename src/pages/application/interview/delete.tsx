import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedApplications, setApplicationId } from "../../../store/application-store/applicationActions";
import {IInterview} from "../../../interfaces/IInterview";
import PermanentDeleteApplication from "../permanent-delete";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";
import RecoverDeletedApplication from "../recover-delete";
import { translation } from "../../../locales/en-US/translation.json";

const DeletedInterviewMeetingList: React.FC = () => {

        const dispatch = useDispatch();
        const history = useHistory();
        const state = useSelector((state) =>state.applicationReducer);
        const [interviews, setInterviews] = useState<IInterview[]>([]);
        const userState = useSelector((userState) => userState.userReducer);
        const [permission, setPermission] = useState<string>("");

        // Table configuration
        const {SearchBar} = Search;
        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            sizePerPage: 15,
            hideSizePerPage: true,
            alwaysShowAllBtns: true,
        };
        


};

export default DeletedInterviewMeetingList;