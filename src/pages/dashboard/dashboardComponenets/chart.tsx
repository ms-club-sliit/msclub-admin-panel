import React from "react";
import { Doughnut } from "react-chartjs-2";
import { IChart } from "../../../interfaces/IChart";

const Chart: React.FC<IChart> = ({ pendingCount, interviewCount, selectedCount }) => {
	const pieChart = (
		<Doughnut
			data={{
				labels: ["Pending", "Selected", "Interview"],
				datasets: [
					{
						data: [pendingCount, interviewCount, selectedCount],
						backgroundColor: ["#FFB100", "#0065BC", "#00A44A"],
						label: "Student Applications",
					},
				],
			}}
			options={{
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
	);

	return (
		<div>
			<div className="chart">{pieChart}</div>
		</div>
	);
};

export default Chart;
