import React from "react";
import { translation } from "../../locales/en-US/translation.json";

const Footer: React.FC = () => (
	<footer className="bg-dark text-center text-white fixed-bottom">
		<div className="text-center p-3 footer-text" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
			{translation.footer.copyright}&nbsp;
			<a className="text-white" href="/">
				{translation.footer.website}
			</a>
		</div>
	</footer>
);

export default Footer;
