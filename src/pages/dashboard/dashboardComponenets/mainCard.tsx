import React from "react";

const MainCard: React.FC = () => {
	return (
		<div className="maincard">
			<div className="card">
				<img className="card-img-top" src="/images/ms_club_logo_crop.png" alt="MS logo" />
				<br></br>
				<div className="row mt-5 mb-6">
					<div className="col-6">
						<div className="card border-dark">
							<div className="card-body text-center">
								<h6 className="card-title">Applications</h6>
								<p className="card-text">82</p>
							</div>
						</div>
					</div>

					<div className="col-6">
						<div className="card border-dark">
							<div className="card-body text-center">
								<h6 className="card-title">Inquiries</h6>
								<p className="card-text">45</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainCard;
