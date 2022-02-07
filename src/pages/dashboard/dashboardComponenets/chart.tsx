import React from "react";
import { Bar } from "react-chartjs-2";

const Chart: React.FC = () => {
	
	const pieChart = (
		<Bar
			data={{
				labels: ["Pending", "Completed", "Deleted"],
				datasets: [
					{
						data: [17, 1, 19],
						backgroundColor: ["#3da19c", "#06adbf", "#f7d619", "#bf00c2", "#ff2684", "#3254a8"],
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

				scales: {
					xAxes: [
						{
							gridLines: {
								display: false,
								drawBorder: true,
								drawOnChartArea: false,
							},
						},
					],
					yAxes: [
						{
							gridLines: {
								display: false,
								drawBorder: true,
								drawOnChartArea: false,
							},
						},
					],
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
