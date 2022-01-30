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

const InquiryList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector((state) => state.inquiryReducer);
	const [inquiries, setInquiries] = useState<IInquiry[]>([]);
	const [selectedTypeInquiry, setselectedTypeInquiry] = useState<IInquiry[]>(inquiries);
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

	// Fetch inquiries information
	useEffect(() => {
		dispatch(getInquiries());
	}, [dispatch, getInquiries]);

	// Set Inquiry data
	useEffect(() => {
		setInquiries(state.inquiries);
	}, [state.inquiries, setInquiries]);

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: "Actions",
			formatter: (cell: any, row: IInquiry) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: "Title", headerStyle: { width: "200px" } },
		{ dataField: "email", text: "Email", headerStyle: { width: "200px" } },
		{
			dataField: "dateTime",
			text: "Date & Time",
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
						<button className="dropdown-item" onClick={(e) => handleSetDeleteInquiry(e, row._id)}>
							<i className="far fa-trash-alt" /> Archive
						</button>
					</div>
				</span>
			</span>
		);
	};

	const handleSetDeleteInquiry = (inquiry: any, inquiryId: string) => {
		if (inquiry) {
			dispatch(setInquiryId(inquiryId));
			$("#inquiryDeleteModal").modal("show");
		}
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
				<h5>Message</h5>
				<div className="row">
					<div className="col-md-10 col-sm-12">
						<p>{row.message}</p>
					</div>
				</div>
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
			<div className="row">
				<div className="col-6">
					<h3 className="page-title">Inquiries</h3>
					<p className="page-description text-muted">Manage all the Inquiry informations</p>
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
						className={`btn btn-sm ${selectedTab === "Deleted" ? "btn-info" : "btn-light"} btn-rounded shadow-none`}
						onClick={(e) => handleDeletedInquriesClick(e)}
					>
						Deleted
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
							*If you experience any difficulty in viewing the Inquiry information, please make sure your cache is
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

			<DeleteInquiry />
		</div>
	);
};

export default InquiryList;
