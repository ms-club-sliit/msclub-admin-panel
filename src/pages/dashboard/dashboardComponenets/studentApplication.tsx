import React, { useEffect, useState } from "react";
import Chart from "./chart";
import { useDispatch, useSelector } from "react-redux";
import { getArchiveApplication } from "../../../store/application-store/applicationActions";
import { IApplication } from "../../../interfaces";

const StudentApplication: React.FC = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.applicationReducer);
	

	
	return (
		<div className="studentapplication card">
			<div className="card-body text-center">
				<h4 className="card-title">Student Applications</h4>
				<p className="card-text">
					<Chart />
				</p>
				<div className="card-deck">
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Pending</h6>
								</div>
								<div className="col-6">
									<p className="card-text">1</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Completed</h6>
								</div>
								<div className="col-6">
									<p className="card-text">5</p>
								</div>
							</div>
						</div>
					</div>
					<div className="card border-dark mb-3">
						<div className="card-body text-center">
							<div className="row">
								<div className="col-6">
									<h6 className="card-title">Deleted</h6>
								</div>
								<div className="col-6">
									<p className="card-text">7</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentApplication;
