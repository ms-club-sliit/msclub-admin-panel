import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedTopSpeakers } from "../../../store/top-speaker-store/topSpeakerActions";
import { ITopSpeaker, IModifiedBy } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";

const DeletedTopSpeakerList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const HtmlToReactParser = require("html-to-react").Parser;
	const state = useSelector((state) => state.topSpeakerReducer);
	const topSpeakers: ITopSpeaker[] = state.deletedTopSpeakers;

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

	// Fetch topSpeaker information
	useEffect(() => {
		dispatch(getDeletedTopSpeakers());
	}, [dispatch]);

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: "Actions",
			formatter: (cell: any, row: ITopSpeaker) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "title", text: "Title", headerStyle: { width: "200px" } },
		{
			dataField: "topSpeakerType",
			text: "Type",
			headerStyle: { width: "110px" },
			formatter: (cell: string) => {
				return (
					<div>
						{cell === "DELETED" ? (
							<span className="badge rounded-pill bg-primary text-light">Deleted Top Speakers</span>
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
		renderer: (row: ITopSpeaker) => (
			<div>
				<h5>Top Speaker Information</h5>
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
							&nbsp; Description
						</h6>
						<p>{convertToPlain(row.description)}</p>
					</div>
				</div>
			</div>
		),
	};

	const handleGoBackToTopSpeakers = (topSpeaker: any) => {
		history.push("/topSpeakers/");
	};

	return (
		<div className="card">
			<div className="row">
				<div className="col-6">
					<h3 className="page-title">Top Speakers</h3>
					<p className="page-description text-muted">Manage all the top speaker informations</p>
				</div>
				<div className="col-6">
					<div className="d-flex justify-content-end">
						<button
							className="btn btn-primary btn-rounded shadow-none"
							data-mdb-toggle="modal"
							data-mdb-target="#addTopSpeakerModal"
						>
							<span className="fas fa-plus" />
							<span className="mx-2">Add New Top Speaker</span>
						</button>
					</div>
				</div>
			</div>

			<div>
				<div className="d-flex">
					<button className="btn btn-sm btn-light shadow-none btn-rounded" onClick={handleGoBackToTopSpeakers}>
						Go Back
					</button>
				</div>
			</div>

			<ToolkitProvider keyField="_id" data={topSpeakers} columns={tableColumnData} search>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search topSpeakers" className="mb-3 search-bar" />
						</div>
						<p className="table-description text-muted">
							*If you experience any difficulty in viewing the top speaker information, please make sure your cache is
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

export default DeletedTopSpeakerList;
