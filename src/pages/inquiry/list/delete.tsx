import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeletedInquiries, setInquiryId } from "../../../store/inquiry-store/inquiryAction";
import { IInquiry } from "../../../interfaces";
import RecoverDeletedInquiry from "../recover-delete";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import { useHistory } from "react-router-dom";

const DeletedInquiryList: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const state = useSelector((state) => state.inquiryReducer);
	const [inquiries, setInquiries] = useState<IInquiry[]>([]);

	// Table confuguration
	const { SearchBar } = Search;
	const options = {
		paginationSize: 4,
		pageStartIndex: 1,
		sizePerPage: 15,
		hideSizePerPage: true,
		alwaysShowAllBtns: true,
	};

	// Fetch inquiry information
	useEffect(() => {
		dispatch(getDeletedInquiries());
	}, [dispatch, getDeletedInquiries]);

	useEffect(() => {
		setInquiries(state.deleteInquiries);
	}, [state.deleteInquiries, setInquiries]);

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
		{ dataField: "message", text: "Message", headerStyle: { width: "200px" } },
		{
			dataField: "deletedAt",
			text: "Deleted At",
			headerStyle: { width: "220px" },
			formatter: (cell: string) => {
				return moment(cell).format("LLL");
			},
		},
	];

	const handleSetRecoverInquiryPermanently = (inquiry: any, inquiryId: string) => {
		if (inquiry) {
			dispatch(setInquiryId(inquiryId));
			$("#inquiryRecoverDeletedModal").modal("show");
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
								<button className="dropdown-item" onClick={(e) => handleSetRecoverInquiryPermanently(e, row._id)}>
									<i className="fas fa-undo" /> Recover
								</button>
								<button className="dropdown-item">
									<i className="far fa-trash-alt" /> Delete Permanently
								</button>
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
	const handleGoBackToInquiries = (inquiry: any) => {
		if (inquiry) {
			history.push("/inquiries");
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
					<button className="btn btn-sm btn-light shadow-none btn-rounded" onClick={handleGoBackToInquiries}>
						Go Back
					</button>
				</div>
			</div>

			<ToolkitProvider keyField="_id" data={inquiries} columns={tableColumnData} search>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search Webinars" className="mb-3 search-bar" />
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
			<RecoverDeletedInquiry />
		</div>
	);
};

export default DeletedInquiryList;
