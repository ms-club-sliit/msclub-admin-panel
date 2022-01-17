import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsUs, setContactUsId } from "../../../store/contact-store/contactUsAction";
import { IContactUs } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

const InquiryList: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.contactUsReducer);
	const contactsUs: IContactUs[] = state.contactsUs;
	const [selectedTypeContactUs, setselectedTypeContactUs] = useState<IContactUs[]>(contactsUs);
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
		dispatch(getContactsUs());
	}, [dispatch, getContactsUs]);

	// Table column configurations
	const tableColumnData = [
		{
			dataField: "actions",
			text: "Actions",
			formatter: (cell: any, row: IContactUs) => actionButtonFormatter(row),
			headerStyle: { width: "90px" },
		},
		{ dataField: "name", text: "Title", headerStyle: { width: "200px" } },
		{ dataField: "email", text: "Email", headerStyle: { width: "200px" } },
		{ dataField: "message", text: "Message", headerStyle: { width: "200px" } },
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
						<button className="dropdown-item" onClick={(e) => handleSetDeleteEvent(e, row._id)}>
							<i className="far fa-trash-alt" /> Delete
						</button>
					</div>
				</span>
			</span>
		);
	};

	const handleSetDeleteEvent = (event: any, contactUsId: string) => {
		if (event) {
			dispatch(setContactUsId(contactUsId));
			$("#eventDeleteModal").modal("show");
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
		renderer: (row: IContactUs) => (
			<div>
				<h5>ContactUs Information</h5>
				<div className="row">
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Contact Name</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>Y{row.name}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Contact Email</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.email}</p>
					</div>
					<div className="col-md-2 col-sm-12">
						<h5 className="row-header">Contact Message</h5>
					</div>
					<div className="col-md-10 col-sm-12">
						<p>{row.message}</p>
					</div>
				</div>
			</div>
		),
	};

	return (
		<div className="card">
			<div className="row">
				<div className="col-6">
					<h3 className="page-title">Inquiry</h3>
					<p className="page-description text-muted">Manage all the ContactUs informations</p>
				</div>
			</div>

			<ToolkitProvider
				keyField="_id"
				data={selectedTab === "All" ? contactsUs : selectedTypeContactUs}
				columns={tableColumnData}
				search
			>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search events" className="mb-3 search-bar" />
						</div>
						<p className="table-description text-muted">
							*If you experience any difficulty in viewing the ContactUs information, please make sure your cache is
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

export default InquiryList;
