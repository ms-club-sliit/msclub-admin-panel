import React from "react";
import { translation } from "../../../locales/en-US/translation.json";

const MeetingScheduler: React.FC = () => {
	return (
		<div className="ms-short">
			<div className="card">
				<h5 className="m-0">
					<i className="fa fa fa-calendar-check-o text-info"></i>&nbsp;
					{translation.dashboard["meeting-scheduler"].title}
				</h5>
				<div className="card-body">
					<img className="card-img-top" src="/images/meetingscheduler.svg" alt="urlshort-img" />
					<p className="mt-2">{translation.dashboard["meeting-scheduler"].description}</p>
					<a href={process.env.REACT_APP_MS_SCHEDULER} rel="noreferrer" target="_blank">
						<button className="btn btn-primary">{translation.dashboard["meeting-scheduler"]["schduler-button"]}</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default MeetingScheduler;
