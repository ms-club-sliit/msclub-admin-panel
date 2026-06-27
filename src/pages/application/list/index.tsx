import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	applications as getApplications,
	setApplicationId,
	changeApplicationStatusIntoSelected,
	changeApplicationStatusIntoRejected,
} from "../../../store/application-store/applicationActions";
import { IApplication, IPagination } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router-dom";
import ApplicationInterviewForm from "../interview";
import DeleteApplication from "../delete";
import ApplicationLoader from "../loader";
import { translation } from "../../../locales/en-US/translation.json";
import ApplicationMeetingDetailsView from "./../view-interview-details/index";

const ApplicationList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector((state) => state.applicationReducer);
	const applications: IApplication[] = state.applications ?? [];
	const pagination: IPagination | null = state.pagination ?? null;

	const [selectedTab, setSelectedTab] = useState<string>("All");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);

	const userState = useSelector((userState) => userState.userReducer);
	const [permission, setPermission] = useState<string>("");

	// Table configuration
	const { SearchBar } = Search;

	// Fetch applications from the server whenever page, limit, or status filter changes
	useEffect(() => {
		const status = selectedTab === "All" ? "" : selectedTab;
		dispatch(getApplications(currentPage, limit, status));
		window.scrollTo(0, 0);
	}, [currentPage, limit, selectedTab, dispatch]);

	// Refetch after an application status is updated
	useEffect(() => {
		if (state.updatedApplication) {
			const status = selectedTab === "All" ? "" : selectedTab;
			dispatch(getApplications(currentPage, limit, status));
		}
	}, [state.updatedApplication]);

	// Refetch after an application is deleted
	useEffect(() => {
		if (state.deletedApplication) {
			const status = selectedTab === "All" ? "" : selectedTab;
			dispatch(getApplications(currentPage, limit, status));
		}
	}, [state.deletedApplication]);

	// Sync user permission level from auth state
	useEffect(() => {
		if (userState.authUser && userState.authUser.permissionLevel) {
			setPermission(userState.authUser.permissionLevel);
		}
	}, [userState.authUser, setPermission]);

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
			text: translation.table["table-action-header"],
			formatter: (cell: any, row: IApplication) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: "Name", headerStyle: { width: "200px" } },
		{
			dataField: "studentId",
			text: translation.table["table-student-id-header"],
			headerStyle: { width: "110px" },
		},
		{
			dataField: "email",
			text: translation.table["table-email-header"],
			headerStyle: { width: "220px" },
		},
		{
			dataField: "contactNumber",
			text: translation.table["table-contact-number-header"],
			headerStyle: { width: "220px" },
		},
		{
			dataField: "status",
			text: translation.table["table-status-header"],
			headerStyle: { width: "110px" },
			formatter: (cell: string) => {
				return (
					<div>
						{cell === "PENDING" ? (
							<span className="badge rounded-pill bg-warning text-light">
								{translation["table-data-filter-label"].applications.pending}
							</span>
						) : null}
						{cell === "INTERVIEW" ? (
							<span className="badge rounded-pill bg-primary text-light">
								{translation["table-data-filter-label"].applications.interview}
							</span>
						) : null}
						{cell === "SELECTED" ? (
							<span className="badge rounded-pill bg-success text-light">
								{translation["table-data-filter-label"].applications.selected}
							</span>
						) : null}
						{cell === "REJECTED" ? (
							<span className="badge rounded-pill bg-danger text-light">
								{translation["table-data-filter-label"].applications.rejected}
							</span>
						) : null}
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
						{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && (
							<button className="dropdown-item" onClick={() => handleSetDeleteApplication(row._id)}>
								<i className="far fa-trash-alt" /> {translation["data-row-action-dropdown"]["delete-button"]}
							</button>
						)}
					</div>
				</span>
			</span>
		);
	};

	const handleSetViewMeetingData = (applicationId: string) => {
		dispatch(setApplicationId(applicationId));
		$("#meetingDataViewModal").modal("show");
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
				<h5>{translation["table-row-information"].applications["applications-information-title"]}</h5>
				<div className="row">
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications["academic-year"]}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.currentAcademicYear}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications["self-introdction"]}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.selfIntroduction}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications["reason-for-join"]}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.reasonForJoin}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications.linkedIn}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.linkedIn}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications.gitHub}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<a href={row.gitHub} target="_blank" rel="noreferrer">
							{row.gitHub}
						</a>
					</div>
					{row.blog ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">{translation["table-row-information"].applications.blog}</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.blog}</p>
							</div>
						</>
					) : null}
					{row.experiences ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">{translation["table-row-information"].applications.experiences}</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.experiences}</p>
							</div>
						</>
					) : null}
					{row.challenges ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">{translation["table-row-information"].applications.challenges}</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.challenges}</p>
							</div>
						</>
					) : null}
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications.goal}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.goal}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications["skills-and-talents"]}</h5>
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
								<h5 className="row-header">{translation["table-row-information"].applications["past-works"]}</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.pastWork}</p>
							</div>
						</>
					) : null}
					{row.deletedAt ? (
						<>
							<div className="col-md-2 col-sm-12">
								<h5 className="row-header">{translation["table-row-information"].applications["deleted-at"]}</h5>
							</div>
							<div className="col-md-10 col-sm-12">
								<p>{row.deletedAt}</p>
							</div>
						</>
					) : null}

					<div className="col-md-4 col-sm-12">
						<div className="row">
							<div className="col-md-3 col-sm-12">
								{(permission === "ROOT_ADMIN" || permission === "ADMIN") && row.meeting?.meetingId === undefined && (
									<button
										className={`btn btn-sm btn-primary ${row.status === "INTERVIEW" ? "disabled" : ""}`}
										onClick={() => {
											handleSetApplicationInterview(row._id);
										}}
									>
										{translation["table-data-filter-label"].applications.interview}
									</button>
								)}
								{(permission === "ROOT_ADMIN" || permission === "ADMIN") && row.meeting?.meetingId !== undefined && (
									<button
										className={`btn btn-sm btn-info ${row.status === "INTERVIEW" ? "active" : "disabled"}`}
										onClick={() => {
											handleSetViewMeetingData(row._id);
										}}
									>
										{translation["table-data-filter-label"].applications.interview}
									</button>
								)}
							</div>
							<div className="col-md-3 col-sm-12">
								{(permission === "ROOT_ADMIN" || permission === "ADMIN") && (
									<button
										className={`btn  btn-sm btn-success ${row.status === "SELECTED" ? "disabled" : ""}`}
										onClick={() => {
											onSumbitSelected(row._id);
										}}
									>
										{translation["table-data-filter-label"].applications.selected}
									</button>
								)}
							</div>
							<div className="col-md-3 col-sm-12">
								{(permission === "ROOT_ADMIN" || permission === "ADMIN") && (
									<button
										className={`btn  btn-sm btn-danger ${row.status === "REJECTED" ? "disabled" : ""}`}
										onClick={() => {
											onSumbitRejected(row._id);
										}}
									>
										{translation["table-data-filter-label"].applications.rejected}
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		),
	};

	// Handle status filter tab change — resets to page 1 to avoid empty page results
	const handleViewClick = (_event: any, type: string) => {
		setSelectedTab(type);
		setCurrentPage(1);
	};

	const handleDeletedApplicationClick = (application: any) => {
		if (application) {
			history.push("/applications/deleted");
		}
	};

	// Handle page navigation
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	// Handle page size change — resets to page 1 so results are coherent
	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLimit(Number(e.target.value));
		setCurrentPage(1);
	};

	return (
		<div className="card">
			{!state.loading ? (
				<div>
					<div className="row">
						<div className="col-6">
							<h3 className="page-title">{translation["page-title"]["application-page-header"]}</h3>
							<p className="page-description text-muted">
								{translation["page-description"]["application-page-description"]}
							</p>
						</div>
					</div>

					<div>
						<div className="d-flex">
							<button
								className={`btn btn-sm ${selectedTab === "All" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
								onClick={(e) => handleViewClick(e, "All")}
							>
								{translation["table-data-filter-label"].all}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${selectedTab === "PENDING" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
								onClick={(e) => handleViewClick(e, "PENDING")}
							>
								{translation["table-data-filter-label"].pending}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${
									selectedTab === "INTERVIEW" ? "btn-info" : "btn-light"
								} btn-rounded shadow-none`}
								onClick={(e) => handleViewClick(e, "INTERVIEW")}
							>
								{translation["table-data-filter-label"].interview}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${
									selectedTab === "SELECTED" ? "btn-info" : "btn-light"
								} btn-rounded shadow-none`}
								onClick={(e) => handleViewClick(e, "SELECTED")}
							>
								{translation["table-data-filter-label"].selected}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${
									selectedTab === "REJECTED" ? "btn-info" : "btn-light"
								} btn-rounded shadow-none`}
								onClick={(e) => handleViewClick(e, "REJECTED")}
							>
								{translation["table-data-filter-label"].rejected}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
								onClick={(e) => handleDeletedApplicationClick(e)}
							>
								{translation["table-data-filter-label"].deleted}
							</button>
						</div>
					</div>

					<ToolkitProvider keyField="_id" data={applications} columns={tableColumnData} search>
						{(props) => (
							<div>
								<div className="d-flex justify-content-end">
									<SearchBar {...props.searchProps} placeholder="Search Applications" className="mb-3 search-bar" />
								</div>
								<p className="table-description text-muted">
									{translation["table-description"]["application-table-description"]}
								</p>

								{applications.length > 0 ? (
									<BootstrapTable
										{...props.baseProps}
										expandRow={expandRow}
										bordered
										striped
										headerClasses="header-class"
										wrapperClasses="table-responsive"
										hover
										rowClasses="table-row"
									/>
								) : (
									<div className="applications-empty-state">
										<i className="fas fa-inbox" />
										<p>No applications found for the selected filter.</p>
									</div>
								)}
							</div>
						)}
					</ToolkitProvider>

					{/* Pagination Controls */}
					<div className="pagination-controls">
						{/* Page size selector */}
						<div className="page-size-selector">
							<span>Rows per page:</span>
							<select value={limit} onChange={handleLimitChange} disabled={state.loading}>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
							</select>
						</div>

						{/* Page info and navigation */}
						<div className="pagination-actions">
							{pagination && (
								<span className="pagination-info">
									Page {pagination.currentPage} of {pagination.totalPages} &nbsp;({pagination.totalRecords} total)
								</span>
							)}
							<button
								className="btn btn-sm btn-outline-secondary btn-pagination"
								disabled={!pagination?.hasPrevPage || state.loading}
								onClick={() => handlePageChange(currentPage - 1)}
							>
								<i className="fas fa-chevron-left" /> Previous
							</button>
							<button
								className="btn btn-sm btn-outline-secondary btn-pagination"
								disabled={!pagination?.hasNextPage || state.loading}
								onClick={() => handlePageChange(currentPage + 1)}
							>
								Next <i className="fas fa-chevron-right" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<ApplicationLoader />
			)}
			<ApplicationInterviewForm />
			<DeleteApplication />
			<ApplicationMeetingDetailsView />
		</div>
	);
};

export default ApplicationList;
