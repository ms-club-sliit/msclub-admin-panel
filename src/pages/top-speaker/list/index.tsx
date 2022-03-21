import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopSpeakers, setTopSpeakerId } from "../../../store/top-speaker-store/topSpeakerActions";
import { ITopSpeaker, IModifiedBy } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";
import TopSpeakerView from "../view";
import AddTopSpeaker from "../add";
import UpdateTopSpeaker from "../update";
import DeleteTopSpeaker from "../delete";
import TopSpeakerLoader from "../loader";
import { translation } from "../../../locales/en-US/translation.json";

const TopSpeakerList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.topSpeakerReducer);
	const topSpeakers: ITopSpeaker[] = state.topSpeakers;
	const [selectedTypeTopSpeakers, setSelectedTypeTopSpeakers] = useState<ITopSpeaker[]>(topSpeakers);
	const [selectedTab, setSelectedTab] = useState<string>("All");
	const userState = useSelector((userState) => userState.userReducer);
	const [permission, setPermission] = useState<string>("");

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

	// Fetch topSpeakers information
	useEffect(() => {
		dispatch(getTopSpeakers());
	}, [selectedTypeTopSpeakers, dispatch]);

	useEffect(() => {
		dispatch(getTopSpeakers());
	}, [state.deletedTopSpeaker, dispatch]);

	useEffect(() => {
		if (userState.authUser && userState.authUser.permissionLevel) {
			setPermission(userState.authUser.permissionLevel);
		}
	}, [userState.authUser]);

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: translation.table["table-action-header"],
			formatter: (cell: any, row: ITopSpeaker) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "title", text: translation.table["table-title-header"], headerStyle: { width: "200px" } },
		{
			dataField: "topSpeakerType",
			text: translation.table["table-type-header"],
			headerStyle: { width: "110px" },
			formatter: (cell: string) => {
				return (
					<div>
						{cell === "DELETED" ? (
							<span className="badge rounded-pill bg-primary text-light">
								{translation["table-type-header-label"]["top-speakers"]["deleted-top-speakers"]}
							</span>
						) : null}
					</div>
				);
			},
		},
		{
			dataField: "createdAt",
			text: translation.table["table-date-time-header"],
			headerStyle: { width: "220px" },
			formatter: (cell: string) => {
				return moment(cell).format("LLL");
			},
		},
		{
			dataField: "updatedAt",
			text: translation.table["table-last-modified-at-header"],
			headerStyle: { width: "220px" },
			formatter: (cell: string) => {
				return moment(cell).format("LLL");
			},
		},
		{
			dataField: "updatedBy",
			text: translation.table["table-last-modified-by-header"],
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
						<span className="dropdown-item" onClick={() => handleSetViewTopSpeaker(row._id)}>
							<i className="far fa-eye" /> {translation["data-row-action-dropdown"]["view-button"]}
						</span>
						{(permission === "ROOT_ADMIN" || permission === "ADMIN") && (
							<span className="dropdown-item" onClick={(e) => handleSetUpdateTopSpeaker(e, row._id)}>
								<i className="far fa-edit" /> {translation["data-row-action-dropdown"]["edit-button"]}
							</span>
						)}
						{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && (
							<button className="dropdown-item" onClick={(e) => handleSetDeleteTopSpeaker(e, row._id)}>
								<i className="far fa-trash-alt" /> {translation["data-row-action-dropdown"]["delete-button"]}
							</button>
						)}
					</div>
				</span>
			</span>
		);
	};

	const handleSetViewTopSpeaker = (topSpeakerId: string) => {
		dispatch(setTopSpeakerId(topSpeakerId));
		$("#topSpeakerViewModal").modal("show");
	};

	const handleSetUpdateTopSpeaker = (topSpeaker: any, topSpeakerId: string) => {
		if (topSpeaker) {
			dispatch(setTopSpeakerId(topSpeakerId));
			$("#topSpeakerUpdateModal").modal("show");
		}
	};

	const handleSetDeleteTopSpeaker = (topSpeaker: any, topSpeakerId: string) => {
		if (topSpeaker) {
			dispatch(setTopSpeakerId(topSpeakerId));
			$("#topSpeakerDeleteModal").modal("show");
		}
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
		renderer: (row: ITopSpeaker) => (
			<div>
				<h5>{translation["table-row-information"]["top-speakers-information"]["top-speakers-information-title"]}</h5>
				<div className="row">
					<div className="col-md-3 col-sm-12">
						<img
							src={`${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/${row.imageUrl}`}
							className="topSpeaker-flyer"
							alt="topSpeaker-flyer"
						/>
					</div>
					<div className="col-md-9 col-sm-12">
						<h6 className="row-header">
							<span className="fas fa-align-left my-2" />
							&nbsp; {translation["table-row-information"]["top-speakers-information"].title}
						</h6>
						<p>{convertToPlain(row.title)}</p>

						<h6 className="row-header">
							<span className="fas fa-align-left my-2" />
							&nbsp; {translation["table-row-information"]["common-information"].description}
						</h6>
						<p>{convertToPlain(row.description)}</p>

						<h6 className="row-header">
							<span className="fas fa-link" /> &nbsp;
							{translation["table-row-information"]["top-speakers-information"]["facebook-link"]}
						</h6>
						<a href={row.socialMediaURLs.facebook || ""} target="_blank" rel="noreferrer">
							{row.socialMediaURLs.facebook}
						</a>

						<h6 className="row-header">
							<span className="fas fa-link" /> &nbsp;
							{translation["table-row-information"]["top-speakers-information"]["instergram-link"]}
						</h6>
						<a href={row.socialMediaURLs.instagram || ""} target="_blank" rel="noreferrer">
							{row.socialMediaURLs.instagram}
						</a>

						<h6 className="row-header">
							<span className="fas fa-link" /> &nbsp;
							{translation["table-row-information"]["top-speakers-information"]["twitter-link"]}
						</h6>
						<a href={row.socialMediaURLs.twitter || ""} target="_blank" rel="noreferrer">
							{row.socialMediaURLs.twitter}
						</a>

						<h6 className="row-header">
							<span className="fas fa-link" /> &nbsp;
							{translation["table-row-information"]["top-speakers-information"]["linkedin-link"]}
						</h6>
						<a href={row.socialMediaURLs.linkedIn || ""} target="_blank" rel="noreferrer">
							{row.socialMediaURLs.linkedIn}
						</a>

						<h6 className="row-header">
							<span className="fas fa-link" /> &nbsp;
							{translation["table-row-information"]["top-speakers-information"]["website-link"]}
						</h6>
						<a href={row.socialMediaURLs.web || ""} target="_blank" rel="noreferrer">
							{row.socialMediaURLs.web}
						</a>
					</div>
				</div>
			</div>
		),
	};

	const handleViewClick = (topSpeaker: any, type: string) => {
		Promise.resolve()
			.then(() => {
				setSelectedTab(type);
				return type;
			})
			.then((data) => {
				if (data === "All") {
					setSelectedTypeTopSpeakers(topSpeakers);
				} else if (data === "Deleted") {
					setSelectedTypeTopSpeakers(topSpeakers.filter((topSpeaker) => topSpeaker.topSpeakerType === "DELETED"));
				}
			});
	};

	const handleDeletedTopSpeakerClick = (event: any) => {
		if (event) {
			history.push("/topSpeakers/deleted");
		}
	};

	return (
		<div className="card">
			{!state.loading ? (
				<div>
					<div className="row">
						<div className="col-6">
							<h3 className="page-title">{translation["page-title"]["top-speakers-page-header"]}</h3>
							<p className="page-description text-muted">
								{translation["page-description"]["top-speakers-page-description"]}
							</p>
						</div>
						<div className="col-6">
							<div className="d-flex justify-content-end">
								<button
									className="btn btn-primary btn-rounded shadow-none"
									data-mdb-toggle="modal"
									data-mdb-target="#addTopSpeakerModal"
								>
									<span className="fas fa-plus" />
									<span className="mx-2">{translation.buttons["add-new-button"]["top-speakers"]}</span>
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
								{translation["table-data-filter-label"].all}
							</button>
							&nbsp;
							<button
								className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
								onClick={(e) => handleDeletedTopSpeakerClick(e)}
							>
								{translation["table-data-filter-label"].deleted}
							</button>
						</div>
					</div>

					<ToolkitProvider
						keyField="_id"
						data={selectedTab === "All" ? topSpeakers : selectedTypeTopSpeakers}
						columns={tableColumnData}
						search
					>
						{(props) => (
							<div>
								<div className="d-flex justify-content-end">
									<SearchBar {...props.searchProps} placeholder="Search topSpeakers" className="mb-3 search-bar" />
								</div>
								<p className="table-description text-muted">
									{translation["table-description"]["top-speakers-table-description"]}
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
			) : (
				<TopSpeakerLoader />
			)}
			<TopSpeakerView />
			<AddTopSpeaker />
			<UpdateTopSpeaker />
			<DeleteTopSpeaker />
			{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && <UpdateTopSpeaker />}
			{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && <DeleteTopSpeaker />}
		</div>
	);
};

export default TopSpeakerList;
