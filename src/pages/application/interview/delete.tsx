import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedApplications, setApplicationId } from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";
import PermanentDeleteApplication from "../permanent-delete";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";
import RecoverDeletedApplication from "../recover-delete";
import { translation } from "../../../locales/en-US/translation.json";

const DeletedInterviewList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector((state) => state.applicationReducer);
	const [applications, setApplications] = useState<IApplication[]>([]);
	const userState = useSelector((userState) => userState.userReducer);
	const [permission, setPermission] = useState<string>("");

	// Table confuguration
	const { SearchBar } = Search;
	const options = {
		paginationSize: 4,
		pageStartIndex: 1,
		sizePerPage: 15,
		hideSizePerPage: true,
		alwaysShowAllBtns: true,
	};

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: translation.table["table-action-header"],
			formatter: (cell: any, row: IApplication) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: translation.table["table-name-header"], headerStyle: { width: "200px" } },
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
			text: "Contact Number",
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
		{
			dataField: "deletedAt",
			text: translation.table["table-deleted-at-header"],
			headerStyle: { width: "220px" },
			formatter: (cell: string) => {
				return moment(cell).format("LLL");
			},
		},
	];

	const handleSetDeleteApplicationPermanently = (application: any, applicationId: string) => {
		if (application) {
			dispatch(setApplicationId(applicationId));
			$("#applicationDeletePermanentlyModal").modal("show");
		}
	};

	// Fetch deleted applications information
	useEffect(() => {
		dispatch(getDeletedApplications());
	}, [dispatch]);

	const handleSetRecoverDeletedApplication = (application: any, applicationId: string) => {
		if (application) {
			dispatch(setApplicationId(applicationId));
			$("#recoverDeletedApplicationModal").modal("show");
		}
	};

	// Table action buttons
	const actionButtonFormatter = (row: any) => {
		return (
			<div>
				{row ? (
					<span className="dropdown show">
						<span className="dropdown">
							<span className="btn shadow-none btn-sm" data-mdb-toggle="dropdown">
								<i className="fas fa-ellipsis-h"></i>
							</span>
							<div className="dropdown-menu dropdown-menu-right">
								{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && (
									<button className="dropdown-item" onClick={(e) => handleSetRecoverDeletedApplication(e, row._id)}>
										<i className="fas fa-undo" /> {translation["data-row-action-dropdown"].recover}
									</button>
								)}
								{(permission === "ROOT_ADMIN" || permission === "ADMIN") && (
									<button className="dropdown-item" onClick={(e) => handleSetDeleteApplicationPermanently(e, row._id)}>
										<i className="far fa-trash-alt" /> {translation["data-row-action-dropdown"]["delete-permanently"]}
									</button>
								)}
							</div>
						</span>
					</span>
				) : null}
			</div>
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
		renderer: (row: IApplication) => (
			<div>
				<h5>{translation["table-row-information"].applications["applications-information-title"]}</h5>
				<div className="row">
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">{translation["table-row-information"].applications["academic-year"]}</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>Y{row.currentAcademicYear}</p>
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
				</div>
			</div>
		),
	};

	const handleGoBackToApplications = (applications: any) => {
		if (applications) {
			history.push("/applications/");
		}
	};

	return (
		<div className="card">
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
					<button className="btn btn-sm btn-light shadow-none btn-rounded" onClick={handleGoBackToApplications}>
						{translation["table-data-filter-label"]["go-back"]}
					</button>
				</div>
			</div>

			<ToolkitProvider keyField="_id" data={applications} columns={tableColumnData} search>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search applications" className="mb-3 search-bar" />
						</div>
						<p className="table-description text-muted">
							{translation["table-description"]["application-table-description"]}
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
			<RecoverDeletedApplication />
			<PermanentDeleteApplication />
		</div>
	);
};

export default DeletedInterviewList;