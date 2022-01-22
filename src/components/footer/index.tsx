import React from "react";

const Footer: React.FC = () => (
	<footer className="bg-dark text-center text-white fixed-bottom">
		<div className="text-center p-3 footer-text" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
			© 2022 Copyright:&nbsp;
			<a className="text-white" href="/">
				msclubadmin.com
			</a>
		</div>
	</footer>
);

export default Footer;
