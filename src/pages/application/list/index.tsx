import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	applications as getApplications,
	setApplicationId,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
} from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router-dom";
import ApplicationInterviewForm from "../interview";
import DeleteApplication from "../delete";

const ApplicationList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	//const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.applicationReducer);
	const applications: IApplication[] = state.applications;
	const [selectedTypeApplications, setSelectedTypeApplications] = useState<IApplication[]>(applications);
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

	// Fetch applications information
	useEffect(() => {
		dispatch(getApplications());
	}, [selectedTypeApplications, dispatch]);

	useEffect(() => {
		dispatch(getApplications());
	}, [state.updatedApplication, dispatch]);

	useEffect(() => {
		dispatch(getApplications());
	}, [state.deletedApplication, dispatch]);

	// Change Application Status Into Selected
	const onSumbitSelected = (applicationId: string) => {
		if (applicationId) {
			dispatch(changeApplicationStatusIntoSelected(applicationId));
		}
	};

	// Change Application Status Into Rejected
	const onSumbitRejected = (applicationId: string) => {
		if (applicationId) {
			dispatch(changeApplicationStatusIntoRejected(applicationId));
		}
	};

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: "Actions",
			formatter: (cell: any, row: IApplication) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: "Name", headerStyle: { width: "200px" } },
		{
			dataField: "studentId",
			text: "Student ID",
			headerStyle: { width: "110px" },
		},
		{
			dataField: "email",
			text: "Email",
			headerStyle: { width: "220px" },
		},
		{
			dataField: "contactNumber",
			text: "Contact Number",
			headerStyle: { width: "220px" },
		},
		{
			dataField: "status",
			text: "Status",
			headerStyle: { width: "110px" },
			formatter: (cell: string) => {
				return (
					<div>
						{cell === "PENDING" ? <span className="badge rounded-pill bg-warning text-light">PENDING</span> : null}
						{cell === "INTERVIEW" ? <span className="badge rounded-pill bg-primary text-light">INTERVIEW</span> : null}
						{cell === "SELECTED" ? <span className="badge rounded-pill bg-success text-light">SELECTED</span> : null}
						{cell === "REJECTED" ? <span className="badge rounded-pill bg-danger text-light">REJECTED</span> : null}
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
						<span className="dropdown-item" onClick={() => handleSetViewApplication(row._id)}>
							<i className="far fa-eye" /> View
						</span>
						<button className="dropdown-item" onClick={() => handleSetDeleteApplication(row._id)}>
							<i className="far fa-trash-alt" /> Delete
						</button>
					</div>
				</span>
			</span>
		);
	};

	const handleSetViewApplication = (applicationId: string) => {
		dispatch(setApplicationId(applicationId));
		$("#applicationViewModal").modal("show");
	};

	const handleSetDeleteApplication = (applicationId: string) => {
		dispatch(setApplicationId(applicationId));
		$("#applicationDeleteModal").modal("show");
	};

	const handleSetApplicationInterview = (applicationId: string) => {
		dispatch(setApplicationId(applicationId));
		$("#applicationInterviewModal").modal("show");
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
		renderer: (row: IApplication) => (
			<div>
				<h5>Application Information</h5>
				<div className="row">
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Academic Year</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>Y{row.currentAcademicYear}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Self Introdction</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.selfIntroduction}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Reason for Join</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.reasonForJoin}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">LinkedIn</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.linkedIn}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">GitHub</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<a href={row.gitHub} target="_blank" rel="noreferrer">
							{row.gitHub}
						</a>
					</div>
					{row.blog ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">Blog</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.blog}</p>
							</div>
						</>
					) : null}
					{row.experiences ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">Experiences</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.experiences}</p>
							</div>
						</>
					) : null}
					{row.challenges ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">Challenges</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.challenges}</p>
							</div>
						</>
					) : null}
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Goal</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.goal}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Skills and Talents</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						{row.skillsAndTalents.map((Skills, index) => (
							<p key={index}>
								<span className="fas fa-circle fa-xs" />
								&nbsp;
								{Skills}
							</p>
						))}
					</div>
					{row.pastWork ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">Past Work</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.pastWork}</p>
							</div>
						</>
					) : null}
					{row.deletedAt ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">Deleted At</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.deletedAt}</p>
							</div>
						</>
					) : null}

					<div className="col-md-4 col-sm-12">
						<div className="row">
							<div className="col-md-4 col-sm-12">
								<button
									className={`btn btn-sm btn-primary ${row.status === "INTERVIEW" ? "disabled" : ""}`}
									onClick={() => {
										handleSetApplicationInterview(row._id);
									}}
								>
									INTERVIEW
								</button>
							</div>

							<div className="col-md-4 col-sm-12">
								<button
									className={`btn  btn-sm btn-success ${row.status === "SELECTED" ? "disabled" : ""}`}
									onClick={() => {
										onSumbitSelected(row._id);
									}}
								>
									SELECTED
								</button>
							</div>

							<div className="col-md-4 col-sm-12">
								<button
									className={`btn  btn-sm btn-danger ${row.status === "REJECTED" ? "disabled" : ""}`}
									onClick={() => {
										onSumbitRejected(row._id);
									}}
								>
									REJECTED
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		),
	};

	const handleViewClick = (application: any, type: string) => {
		Promise.resolve()
			.then(() => {
				setSelectedTab(type);
				return type;
			})
			.then((data) => {
				if (data === "All") {
					setSelectedTypeApplications(applications);
				} else if (data === "PENDING") {
					setSelectedTypeApplications(applications.filter((application) => application.status === "PENDING"));
				} else if (data === "INTERVIEW") {
					setSelectedTypeApplications(applications.filter((application) => application.status === "INTERVIEW"));
				} else if (data === "SELECTED") {
					setSelectedTypeApplications(applications.filter((application) => application.status === "SELECTED"));
				} else if (data === "REJECTED") {
					setSelectedTypeApplications(applications.filter((application) => application.status === "REJECTED"));
				} else if (data === "Deleted") {
					setSelectedTypeApplications(applications.filter((application) => application.deletedAt !== null));
				}
			});
	};

	const handleDeletedEventClick = () => {
		history.push("/applications/deleted");
	};

	return (
		<div className="card">
			<div className="row">
				<div className="col-6">
					<h3 className="page-title">Applications</h3>
					<p className="page-description text-muted">Manage all the application informations</p>
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
						className={`btn btn-sm ${selectedTab === "PENDING" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "PENDING")}
					>
						Pending
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "INTERVIEW" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "INTERVIEW")}
					>
						Interview
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "SELECTED" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "SELECTED")}
					>
						Selected
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "REJECTED" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleViewClick(e, "REJECTED")}
					>
						Rejected
					</button>
					&nbsp;
					<button
						className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={() => handleDeletedEventClick()}
					>
						Deleted
					</button>
				</div>
			</div>

			<ToolkitProvider
				keyField="_id"
				data={selectedTab === "All" ? applications : selectedTypeApplications}
				columns={tableColumnData}
				search
			>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search Applications" className="mb-3 search-bar" />
						</div>
						<p className="table-description text-muted">
							*If you experience any difficulty in viewing the application information, please make sure your cache is
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

			<ApplicationInterviewForm />
			<DeleteApplication />
		</div>
	);
};

export default ApplicationList;
