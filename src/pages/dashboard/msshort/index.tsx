import React from "react";
import { translation } from "../../../locales/en-US/translation.json";

const MSShort: React.FC = () => {
	return (
		<div className="ms-short">
			<div className="card">
				<h5 className="m-0">
					<i className="fa fa fa-sort-amount-asc text-info"></i>&nbsp;{translation.dashboard["ms-short"].title}
				</h5>
				<div className="card-body">
					<img className="card-img-top" src="/images/msShort.svg" alt="urlshort-img" />
					<p className="mt-2">{translation.dashboard["ms-short"].description}</p>
					<a href="https://msshort.com/admin" rel="noreferrer" target="_blank">
						<button className="btn btn-primary">{translation.dashboard["ms-short"]["shorten-button"]}</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default MSShort;
