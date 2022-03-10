import React from "react";

const MSShort: React.FC = () => {
	return (
		<div className="ms-short">
			<div className="card">
				<h5 className="m-0">
					<i className="fa fa fa-sort-amount-asc text-info"></i>&nbsp;MS Short
				</h5>
				<div className="card-body">
					<img className="card-img-top" src="/images/msShort.svg" alt="urlshort-img" />
					<p className="mt-2">Use our tool to create a short, unique URL that will redirect to the specific website</p>
					<a href="https://msshort.com/admin" rel="noreferrer" target="_blank">
						<button className="btn btn-primary">Shorten</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default MSShort;
