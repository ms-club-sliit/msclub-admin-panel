import React from "react";

const MainCard: React.FC = () => {
	return (
		<div className="maincard">
			<div className="card">
				<img className="card-img-top" src="/images/ms_club_logo_crop.png" alt="MS logo" />
				<br></br>
				<div className="card-body">
					<div className="card-deck" style={{ display: "flex" }}>
						<div className="card border-dark mb-3">
							<div className="card-body text-center">
								<h6 className="card-title">Applications</h6>
								<p className="card-text">82</p>
							</div>
						</div>
						<div className="card border-dark mb-3">
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
