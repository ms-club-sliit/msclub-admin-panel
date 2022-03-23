import moment from "moment";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Loader from "../loader";
import { IApplication } from "../../../interfaces";
import { translation } from "../../../locales/en-US/translation.json";

interface IDataSet {
	label: string;
	data: any;
	backgroundColor: any;
}

interface IChartData {
	labels: string[];
	datasets: IDataSet[];
}

const ApplicationStatus: React.FC = () => {
	const applicationState = useSelector((state) => state.applicationReducer);
	const [data, setData] = useState<IChartData>();
	const [pendingArr, setPendingArr] = useState<IApplication[]>([]);
	const [interviewArr, setInterviewArr] = useState<IApplication[]>([]);
	const [rejectedArr, setRejectedArr] = useState<IApplication[]>([]);
	const [selectedArr, setSelectedArr] = useState<IApplication[]>([]);

	useEffect(() => {
		if (applicationState && applicationState.applications.length > 0) {
			// Set application status
			setPendingArr(
				applicationState.applications.filter((application: IApplication) => application.status === "PENDING")
			);
			setInterviewArr(
				applicationState.applications.filter((application: IApplication) => application.status === "INTERVIEW")
			);
			setSelectedArr(
				applicationState.applications.filter((application: IApplication) => application.status === "SELECTED")
			);
			setRejectedArr(
				applicationState.applications.filter((application: IApplication) => application.status === "REJECTED")
			);

			// Configure chart data
			let pending = 0;
			let interview = 0;
			let selected = 0;
			let rejected = 0;

			for (let application of applicationState.applications) {
				switch (application.status) {
					case "PENDING":
						pending += 1;
						break;
					case "INTERVIEW":
						interview += 1;
						break;
					case "SELECTED":
						selected += 1;
						break;
					case "REJECTED":
						rejected += 1;
						break;
					default:
						break;
				}
			}

			setData({
				labels: ["Pending", "Selected", "Interview", "Rejected"],
				datasets: [
					{
						data: [pending, interview, selected, rejected],
						backgroundColor: ["#FFB100", "#00A44A", "#0065BC", "#FF0000"],
						label: "Student Application Status",
					},
				],
			});
		}
	}, [applicationState, setData]);

	return (
		<div className="application__status">
			<div className="card">
				{!applicationState.loading ? (
					<div>
						<h5 className="m-0">
							<i className="fa fa-file-text text-info"></i>&nbsp;{translation.dashboard["application-status"].title}
						</h5>
						<div className="card-body">
							<div className="chart__container">
								{data ? (
									<Doughnut
										width={300}
										data={data}
										options={{
											legend: {
												display: true,
												position: "right",
											},
											layout: {
												padding: {
													left: 0,
													right: 0,
													top: 0,
													bottom: 0,
												},
											},
										}}
									/>
								) : null}
							</div>
							<div className="status__info">
								<div className="d-flex justify-content-between">
									<div>
										<i className="fa fa-clock text-warning"></i>&nbsp;{translation["table-data-filter-label"].pending}
									</div>
									<div>{pendingArr.length > 0 ? pendingArr.length : 0}</div>
								</div>
								<div className="d-flex justify-content-between">
									<div>
										<i className="fa fa-video-camera text-primary"></i>&nbsp;
										{translation["table-data-filter-label"].interview}
									</div>
									<div>{interviewArr.length > 0 ? interviewArr.length : 0}</div>
								</div>
								<div className="d-flex justify-content-between">
									<div>
										<i className="fa fa-check text-success"></i>&nbsp;{translation["table-data-filter-label"].selected}
									</div>
									<div>{selectedArr.length > 0 ? selectedArr.length : 0}</div>
								</div>
								<div className="d-flex justify-content-between">
									<div>
										<i className="fa fa-times text-danger"></i>&nbsp;{translation["table-data-filter-label"].rejected}
									</div>
									<div>{rejectedArr.length > 0 ? rejectedArr.length : 0}</div>
								</div>
								<hr />
								<div className="d-flex justify-content-between">
									<div>
										<strong>{translation.dashboard["application-status"].total}</strong>
									</div>
									<div>
										<strong>{applicationState && applicationState.applications.length}</strong>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<Loader type="status_loader" />
				)}
			</div>
		</div>
	);
};

export default ApplicationStatus;
