import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedWebinars } from "../../../store/webinar-store/webinarActions";
import { IWebinar } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { IModifiedBy } from "../../../interfaces";
import { useHistory } from "react-router-dom";

const DeletedWebinarList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const HtmlToReactParser = require("html-to-react").Parser;
  const state = useSelector((state) => state.webinarReducer);
  const webinars: IWebinar[] = state.deletedWebinars;

  const convertToPlain = (html: string) => {
    const htmlToParser = new HtmlToReactParser();
    const reactElement = htmlToParser.parse(html);
    return reactElement;
  };

  // Table confuguration
  const { SearchBar } = Search;
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 15,
    hideSizePerPage: true,
    alwaysShowAllBtns: true,
  };

  // Fetch webinar information
  useEffect(() => {
    dispatch(getDeletedWebinars());
  }, [dispatch]);

  // Table column configurations
  const tableColumnData = [
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell: any, row: IWebinar) => actionButtonFormatter(row),
      headerStyle: { width: "90px" },
    },
    { dataField: "title", text: "Title", headerStyle: { width: "200px" } },
    {
      dataField: "webinarType",
      text: "Type",
      headerStyle: { width: "110px" },
      formatter: (cell: string) => {
        return (
          <div>
            {cell === "UPCOMING" ? (
              <span className="badge rounded-pill bg-primary text-light">
                Upcoming Webinar
              </span>
            ) : null}
            {cell === "PAST" ? (
              <span className="badge rounded-pill bg-warning text-dark">
                Past Webinar
              </span>
            ) : null}
          </div>
        );
      },
    },
    {
      dataField: "dateTime",
      text: "Date & Time",
      headerStyle: { width: "220px" },
      formatter: (cell: string) => {
        return moment(cell).format("LLL");
      },
    },
    {
      dataField: "deletedAt",
      text: "Deleted At",
      headerStyle: { width: "220px" },
      formatter: (cell: string) => {
        return moment(cell).format("LLL");
      },
    },
    {
      dataField: "updatedBy",
      text: "Deleted By",
      headerStyle: { width: "250px" },
      formatter: (cell: IModifiedBy[]) => {
        let lastModifiedUser = cell.slice(-1)[0];
        return (
          <div>
            <span>
              <img
                src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${lastModifiedUser.user.profileImage}`}
                className="table-profile-img"
                alt="updated-by-user"
              />
            </span>
            {`${lastModifiedUser.user.firstName} ${lastModifiedUser.user.lastName}`}
            <span className="badge rounded-pill bg-dark mx-2">
              {lastModifiedUser.user.permissionLevel === "ROOT_ADMIN"
                ? "Root Admin"
                : null}
              {lastModifiedUser.user.permissionLevel === "ADMIN"
                ? "Administrator"
                : null}
              {lastModifiedUser.user.permissionLevel === "EDITOR"
                ? "Editor"
                : null}
            </span>
          </div>
        );
      },
    },
  ];

  // Table action buttons
  const actionButtonFormatter = (row: any) => {
    return (
      <span className="dropdown show">
        <span className="dropdown">
          <span className="btn shadow-none btn-sm" data-mdb-toggle="dropdown">
            <i className="fas fa-ellipsis-h"></i>
          </span>
          <div className="dropdown-menu dropdown-menu-right">
            <span className="dropdown-item">
              <i className="fas fa-undo" /> Recover
            </span>
            <button className="dropdown-item">
              <i className="far fa-trash-alt" /> Delete Permanently
            </button>
          </div>
        </span>
      </span>
    );
  };

  const expandRow = {
    showExpandColumn: true,
    expandByColumnOnly: true,
    onlyOneExpanding: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }: any) => {
      if (isAnyExpands) {
        return <b style={{ cursor: "pointer" }}></b>;
      }
      return <b style={{ cursor: "pointer" }}></b>;
    },
    expandColumnRenderer: ({ expanded }: any) => {
      if (expanded) {
        return (
          <div style={{ cursor: "pointer", marginTop: "5px" }}>
            <i className="fas fa-chevron-circle-up"></i>
          </div>
        );
      }
      return (
        <div style={{ cursor: "pointer", marginTop: "5px" }}>
          <i className="fas fa-chevron-circle-down"></i>
        </div>
      );
    },
    renderer: (row: IWebinar) => (
      <div>
        <h5>Webinar Information</h5>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <img
              src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${row.imageUrl}`}
              className="event-flyer"
              alt="event-flyer"
            />
          </div>
          <div className="col-md-9 col-sm-12">
            <h6 className="row-header">
              <span className="fas fa-link" /> &nbsp; Webinar Link
            </h6>
            <a href={row.link} target="_blank" rel="noreferrer">
              {row.link}
            </a>

            <h6 className="row-header my-3">
              <span className="fas fa-link" /> &nbsp; Registration Link
            </h6>
            <a href={row.registrationLink} target="_blank" rel="noreferrer">
              {row.registrationLink}
            </a>

            {row.tags && row.tags.length > 0 ? (
              <div>
                <h6 className="row-header my-3">
                  <span className="fas fa-tags" /> Tags &nbsp;
                </h6>
                <div className="d-flex">
                  {row.tags.map((tag, index) => (
                    <div className="tag-badge" key={index}>
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <h6 className="row-header">
              <span className="fas fa-align-left my-2" />
              &nbsp; Description
            </h6>
            <p>{convertToPlain(row.description)}</p>
          </div>
        </div>
      </div>
    ),
  };
  const handleGoBackToWebinars = (event: any) => {
    history.push("/webinars/");
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <h3 className="page-title">Events</h3>
          <p className="page-description text-muted">
            Manage all the webinar informations
          </p>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary btn-rounded shadow-none"
              data-mdb-toggle="modal"
              data-mdb-target="#addEventModal"
            >
              <span className="fas fa-plus" />
              <span className="mx-2">Add New Webinar</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex">
          <button
            className="btn btn-sm btn-light shadow-none btn-rounded"
            onClick={handleGoBackToWebinars}
          >
            Go Back
          </button>
        </div>
      </div>

      <ToolkitProvider
        keyField="_id"
        data={webinars}
        columns={tableColumnData}
        search
      >
        {(props) => (
          <div>
            <div className="d-flex justify-content-end">
              <SearchBar
                {...props.searchProps}
                placeholder="Search Webinars"
                className="mb-3 search-bar"
              />
            </div>
            <p className="table-description text-muted">
              *If you experience any difficulty in viewing the Webinar
              information, please make sure your cache is cleared and completed
              a hard refresh.
            </p>
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
              expandRow={expandRow}
              bordered
              striped
              headerClasses="header-class"
              wrapperClasses="table-responsive"
              hover
              rowClasses="table-row"
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default DeletedWebinarList;
