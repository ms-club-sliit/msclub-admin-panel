import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  setViewEvent,
} from "../../../store/event-store/eventActions";
import { IEvent } from "../../../store/event-store/IEvent";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { IModifiedBy } from "../../../store/interfaces";
import { IEventView } from "../../../interfaces";
import EventView from "../view";
import AddEvent from "../add";

const EventList: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.eventReducer);
  const events: IEvent[] = state.events;
  const [selectedTypeEvents, setSelectedTypeEvents] =
    useState<IEvent[]>(events);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  // Table confuguration
  const { SearchBar } = Search;
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 15,
    hideSizePerPage: true,
    alwaysShowAllBtns: true,
  };

  // Fetch events information
  useEffect(() => {
    dispatch(getEvents());
  }, [selectedTypeEvents]);

  // Table column configurations
  const tableColumnData = [
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell: any, row: IEvent) => actionButtonFormatter(row),
      headerStyle: { width: "90px" },
    },
    { dataField: "title", text: "Title", headerStyle: { width: "200px" } },
    {
      dataField: "eventType",
      text: "Type",
      headerStyle: { width: "110px" },
      formatter: (cell: string) => {
        return (
          <div>
            {cell === "UPCOMING" ? (
              <span className="badge rounded-pill bg-primary text-light">
                Upcoming Event
              </span>
            ) : null}
            {cell === "PAST" ? (
              <span className="badge rounded-pill bg-warning text-dark">
                Past Event
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
      dataField: "updatedAt",
      text: "Last Modified At",
      headerStyle: { width: "220px" },
      formatter: (cell: string) => {
        return moment(cell).format("LLL");
      },
    },
    {
      dataField: "updatedBy",
      text: "Last Modified By",
      headerStyle: { width: "250px" },
      formatter: (cell: IModifiedBy[]) => {
        let lastModifiedUser = cell.slice(-1)[0];
        return (
          <div>
            <span>
              <img
                src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${lastModifiedUser.user.profileImage}`}
                className="table-profile-img"
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
          <a
            href="#"
            className="btn shadow-none btn-sm"
            data-mdb-toggle="dropdown"
          >
            <i className="fas fa-ellipsis-h"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              href="#"
              className="dropdown-item"
              onClick={(e) => handleSetViewEvent(row)}
            >
              <i className="far fa-eye" /> View
            </a>
            <a
              className="dropdown-item"
              href="/"
              data-mdb-toggle="modal"
              data-mdb-target="#update-exam"
            >
              <i className="far fa-edit" /> Edit
            </a>
            <button
              className="dropdown-item"
              data-mdb-toggle="modal"
              data-mdb-target="#delete-exam"
            >
              <i className="far fa-trash-alt" /> Delete
            </button>
          </div>
        </span>
      </span>
    );
  };

  const handleSetViewEvent = (eventData: IEvent) => {
    let viewEvent: IEventView = {
      title: eventData.title,
      description: eventData.description,
      eventType: eventData.eventType,
      dateTime: eventData.dateTime,
      imageUrl: eventData.imageUrl,
      link: eventData.link,
      tags: eventData.tags,
      createdBy: eventData.createdBy,
      createdAt: eventData.createdAt as Date,
      updatedBy: eventData.updatedBy,
      updatedAt: eventData.updatedAt as Date,
    };

    dispatch(setViewEvent(viewEvent));
    $("#eventViewModal").modal("show");
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
    renderer: (row: IEvent) => (
      <div>
        <h5>Event Information</h5>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <img
              src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${row.imageUrl}`}
              className="event-flyer"
            />
          </div>
          <div className="col-md-9 col-sm-12">
            <h6>
              <span className="fas fa-align-left my-2" />
              &nbsp; Description
            </h6>
            <p>{row.description}</p>

            <h6>
              <span className="fas fa-link" /> &nbsp; Event Link
            </h6>
            <p>{row.link}</p>

            {row.tags && row.tags.length > 0 ? (
              <div>
                <h6>
                  <span className="fas fa-tags" /> Tags &nbsp;
                </h6>
                {row.tags.map((tag, index) => (
                  <div
                    className="badge rounded-pill bg-dark tag-badge"
                    key={index}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
  };

  const handleViewClick = (event: any, type: string) => {
    Promise.resolve()
      .then(() => {
        setSelectedTab(type);
        return type;
      })
      .then((data) => {
        if (data === "All") {
          setSelectedTypeEvents(events);
        } else if (data === "Upcoming") {
          setSelectedTypeEvents(
            events.filter((event) => event.eventType === "UPCOMING")
          );
        } else if (data === "Past") {
          setSelectedTypeEvents(
            events.filter((event) => event.eventType === "PAST")
          );
        } else if (data === "Deleted") {
          setSelectedTypeEvents(
            events.filter((event) => event.deletedAt !== null)
          );
        }
      });
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <h3 className="page-title">Events</h3>
          <p className="page-description text-muted">
            Manage all the event informations
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
              <span className="mx-2">Add New Event</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex">
          <button
            className={`btn btn-sm ${
              selectedTab === "All" ? "btn-info" : "btn-light"
            } btn-rounded shadow-none`}
            onClick={(e) => handleViewClick(e, "All")}
          >
            All
          </button>
          &nbsp;
          <button
            className={`btn btn-sm ${
              selectedTab === "Upcoming" ? "btn-info" : "btn-light"
            } btn-rounded shadow-none`}
            onClick={(e) => handleViewClick(e, "Upcoming")}
          >
            Upcoming
          </button>
          &nbsp;
          <button
            className={`btn btn-sm ${
              selectedTab === "Past" ? "btn-info" : "btn-light"
            } btn-rounded shadow-none`}
            onClick={(e) => handleViewClick(e, "Past")}
          >
            Past
          </button>
          &nbsp;
          <button
            className={`btn btn-sm ${
              selectedTab === "Deleted" ? "btn-info" : "btn-light"
            } btn-rounded shadow-none`}
            onClick={(e) => handleViewClick(e, "Deleted")}
          >
            Deleted
          </button>
        </div>
      </div>

      <ToolkitProvider
        keyField="_id"
        data={selectedTab === "All" ? events : selectedTypeEvents}
        columns={tableColumnData}
        search
      >
        {(props) => (
          <div>
            <div className="d-flex justify-content-end">
              <SearchBar
                {...props.searchProps}
                placeholder="Search events"
                className="mb-3 search-bar"
              />
            </div>
            <p className="table-description text-muted">
              *If you experience any difficulty in viewing the event
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

      <AddEvent />
      <EventView />
    </div>
  );
};

export default EventList;
