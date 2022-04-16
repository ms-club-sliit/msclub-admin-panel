import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiries, setInquiryId } from "../../../store/inquiry-store/inquiryAction";
import { IInquiry } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";
import DeleteInquiry from "../delete";
import InquiryLoader from "../loader";
import ReplyInquiry from "../reply";
import { translation } from "../../../locales/en-US/translation.json";

const InquiryList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector((state) => state.inquiryReducer);
	const [inquiries, setInquiries] = useState<IInquiry[]>([]);
	const [selectedTypeInquiry, setselectedTypeInquiry] = useState<IInquiry[]>(inquiries);
	const [selectedTab, setSelectedTab] = useState<string>("All");
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

	// Fetch inquiries information
	useEffect(() => {
		dispatch(getInquiries());
	}, [dispatch, getInquiries]);

	// Set Inquiry data
	useEffect(() => {
		setInquiries(state.inquiries);
	}, [state.inquiries, setInquiries]);

	useEffect(() => {
		if (userState.authUser && userState.authUser.permissionLevel) {
			setPermission(userState.authUser.permissionLevel);
		}
	}, [userState.authUser, setPermission]);

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: translation.table["table-action-header"],
			formatter: (cell: any, row: IInquiry) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: translation.table["table-title-header"], headerStyle: { width: "200px" } },
		{ dataField: "email", text: translation.table["table-email-header"], headerStyle: { width: "200px" } },
		{
			dataField: "createdAt",
			text: translation.table["table-date-time-header"],
			headerStyle: { width: "220px" },
			formatter: (cell: string) => {
				return moment(cell).format("LLL");
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
							<>
								<span className="dropdown-item" onClick={(e) => handleSetReplyInquiry(e, row._id)}>
									<i className="fas fa-reply ml-2" /> {translation["data-row-action-dropdown"]["reply-button"]}
								</span>
								<span className="dropdown-item" onClick={(e) => handleSetDeleteInquiry(e, row._id)}>
									<i className="far fa-trash-alt" /> {translation["data-row-action-dropdown"]["delete-button"]}
								</span>
							</>
						)}
					</div>
				</span>
			</span>
		);
	};

	const handleSetDeleteInquiry = (inquiry: any, inquiryId: string) => {
		dispatch(setInquiryId(inquiryId));
		$("#inquiryDeleteModal").modal("show");
	};

	const handleSetReplyInquiry = (inquiry: any, inquiryId: string) => {
		dispatch(setInquiryId(inquiryId));
		$("#inquiryReplyModal").modal("show");
	};

	const handleViewClick = (inquiry: any, type: string) => {
		Promise.resolve()
			.then(() => {
				setSelectedTab(type);
				return type;
			})
			.then((data) => {
				if (data === "All") {
					setselectedTypeInquiry(inquiries);
				} else if (data === "Deleted") {
					setselectedTypeInquiry(inquiries.filter((inquiry) => inquiry.deletedAt !== null));
				}
			});
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
		renderer: (row: IInquiry) => (
			<div>
				<h5>{translation["table-row-information"]["common-information"].message}</h5>
				<div className="row">
					<div className="col-md-10 col-sm-12">
						<p>{row.message}</p>
					</div>
				</div>

				<h5>{translation["table-row-information"]["common-information"].reply}</h5>
				{row.replies && row.replies.length ? (
					row.replies.map((reply: string, index: number) => (
						<div key={index} className="col-md-10 col-sm-12">
							<p>{reply}</p>
						</div>
					))
				) : (
					<div className="col-md-10 col-sm-12">
						<p>{translation["table-row-information"]["common-information"]["no-replies"]}</p>
					</div>
				)}
			</div>
		),
	};

	const handleDeletedInquriesClick = (inquiries: any) => {
		if (inquiries) {
			history.push("/inquiries/deleted");
		}
	};

	return (
		<div className="card">
			{!state.loading ? (
				<div>
					<div className="row">
						<div className="col-6">
							<h3 className="page-title">{translation["page-title"]["inquiries-page-header"]}</h3>
							<p className="page-description text-muted">
								{translation["page-description"]["inquiries-page-description"]}
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
								className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
								onClick={(e) => handleDeletedInquriesClick(e)}
							>
								{translation["table-data-filter-label"].deleted}
							</button>
						</div>
					</div>

					<ToolkitProvider
						keyField="_id"
						data={selectedTab === "All" ? inquiries : selectedTypeInquiry}
						columns={tableColumnData}
						search
					>
						{(props) => (
							<div>
								<div className="d-flex justify-content-end">
									<SearchBar {...props.searchProps} placeholder="Search Inquiries" className="mb-3 search-bar" />
								</div>
								<p className="table-description text-muted">
									{translation["table-description"]["inquiries-table-description"]}
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
				<InquiryLoader />
			)}
			{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && <DeleteInquiry />}
			{(permission === "ROOT_ADMIN" || permission === "ADMIN" || permission == "EDITOR") && <ReplyInquiry />}
		</div>
	);
};

export default InquiryList;
