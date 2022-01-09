import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWebinars, setWebinarId } from "../../../store/webinar-store/webinarActions";
import { IWebinar, IModifiedBy } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";

const WebinarList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.webinarReducer);
	const webinars: IWebinar[] = state.webinars;
	const [selectedTypeWebinars, setSelectedTypeWebinar] = useState<IWebinar[]>(webinars);
	const [selectedTab, setSelectedTab] = useState<string>("All");

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

	// Fetch Webinar Information
	useEffect(() => {
		dispatch(getWebinars());
	}, [dispatch]);

	//Assign Webinar Data
	useEffect(() => {
		setSelectedTypeWebinar(state.webinars);
	}, [state.webinars]);

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
			headerStyle: { width: "150px" },
			formatter: (cell: string) => {
				return (
					<div>
						{cell === "UPCOMING" ? (
							<span className="badge rounded-pill bg-primary text-light">Upcoming Webinar</span>
						) : null}
						{cell === "PAST" ? <span className="badge rounded-pill bg-warning text-dark">Past Webinar</span> : null}
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
								alt="updated-by-user"
							/>
						</span>
						{`${lastModifiedUser.user.firstName} ${lastModifiedUser.user.lastName}`}
						<span className="badge rounded-pill bg-dark mx-2">
							{lastModifiedUser.user.permissionLevel === "ROOT_ADMIN" ? "Root Admin" : null}
							{lastModifiedUser.user.permissionLevel === "ADMIN" ? "Administrator" : null}
							{lastModifiedUser.user.permissionLevel === "EDITOR" ? "Editor" : null}
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
						<span className="dropdown-item" onClick={() => handleSetViewWebinar(row._id)}>
							<i className="far fa-eye" /> View
						</span>
						<span className="dropdown-item" onClick={() => handleSetUpdateWebinar(row._id)}>
							<i className="far fa-edit" /> Edit
						</span>
						<button className="dropdown-item" onClick={() => handleSetDeleteWebinar(row._id)}>
							<i className="far fa-trash-alt" /> Delete
						</button>
					</div>
				</span>
			</span>
		);
	};

	const handleSetViewWebinar = (webinarId: string) => {
		dispatch(setWebinarId(webinarId));
		$("#eventViewModal").modal("show");
	};

	const handleSetUpdateWebinar = (webinarId: string) => {
		dispatch(setWebinarId(webinarId));
		$("#eventUpdateModal").modal("show");
	};

	const handleSetDeleteWebinar = (webinarId: string) => {
		dispatch(setWebinarId(webinarId));
		$("#eventDeleteModal").modal("show");
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
							className="webinar-flyer"
							alt="webinar-flyer"
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

	const handleViewClick = (event: any, type: string) => {
		Promise.resolve()
			.then(() => {
				setSelectedTab(type);
				return type;
			})
			.then((data) => {
				if (data === "All") {
					setSelectedTypeWebinar(webinars);
				} else if (data === "Upcoming") {
					setSelectedTypeWebinar(webinars.filter((event) => event.webinarType === "UPCOMING"));
				} else if (data === "Past") {
					setSelectedTypeWebinar(webinars.filter((event) => event.webinarType === "PAST"));
				} else if (data === "Deleted") {
					setSelectedTypeWebinar(webinars.filter((event) => event.deletedAt !== null));
				}
			});
	};

	const handleDeletedWebinarClick = () => {
		history.push("/webinars/deleted");
	};

	return (
		<div className="card">
			<div className="row">
				<div className="col-6">
					<h3 className="page-title">Webinar</h3>
					<p className="page-description text-muted">Manage all the Webinar informations</p>
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
						className={`btn btn-sm ${selectedTab === "All" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "All")}
					>
						All
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "Upcoming" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "Upcoming")}
					>
						Upcoming
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "Past" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "Past")}
					>
						Past
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={() => handleDeletedWebinarClick()}
					>
						Deleted
					</button>
				</div>
			</div>

			<ToolkitProvider
				keyField="_id"
				data={selectedTab === "All" ? webinars : selectedTypeWebinars}
				columns={tableColumnData}
				search
			>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search Webinars" className="mb-3 search-bar" />
						</div>
						<p className="table-description text-muted">
							*If you experience any difficulty in viewing the webinar information, please make sure your cache is
							cleared and completed a hard refresh.
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

export default WebinarList;
