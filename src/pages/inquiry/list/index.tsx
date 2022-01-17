import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsUs } from "../../../store/contact-store/contactUsAction";
import { IContactUs } from "../../../interfaces";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";


const InquiryList: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.contactUsReducer);
	const [contactsUs, setContacts] = useState<IContactUs[]>([]);

	// Table confuguration
	const { SearchBar } = Search;
	const options = {
		paginationSize: 4,
		pageStartIndex: 1,
		sizePerPage: 15,
		hideSizePerPage: true,
		alwaysShowAllBtns: true,
	};

	// Fetch contactsUs information
	useEffect(() => {
		dispatch(getContactsUs());
	}, [dispatch, getContactsUs]);

	// set contactsUs information
	useEffect(() => {
		setContacts(state.contactsUs);
	}, [state.contactsUs, setContacts]);

	// Table column configurations
	const tableColumnData = [
		{ dataField: "name", text: "Title", headerStyle: { width: "200px" } },
		{ dataField: "email", text: "Email", headerStyle: { width: "200px" } },
		{ dataField: "message", text: "Message", headerStyle: { width: "200px" } },
	];

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
				<h5>Inquiry Information</h5>
				<div className="row">
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
					<p className="page-description text-muted">View all the Inquiry informations</p>
				</div>
			</div>

			<ToolkitProvider keyField="_id" data={contactsUs} columns={tableColumnData} search>
				{(props) => (
					<div>
						<div className="d-flex justify-content-end">
							<SearchBar {...props.searchProps} placeholder="Search Inquiry" className="mb-3 search-bar" />
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
		</div>
	);
};

export default InquiryList;
