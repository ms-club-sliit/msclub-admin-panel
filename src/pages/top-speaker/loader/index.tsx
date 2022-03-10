import React from "react";
import ContentLoader from "react-content-loader";

const TopSpeakerLoader: React.FC = () => {
	return (
		<div>
			<ContentLoader
				speed={2}
				width="auto"
				height={400}
				viewBox="0 0 auto 400"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="3" y="6" rx="5" ry="5" width="180" height="30" />
				<rect x="3" y="48" rx="5" ry="5" width="326" height="13" />
				<rect x="3" y="75" rx="15" ry="15" width="75" height="30" />
				<rect x="90" y="75" rx="15" ry="15" width="75" height="30" />
				<rect x="7" y="156" rx="5" ry="5" width="100%" height="20" />
				<rect x="7" y="190" rx="5" ry="5" width="100%" height="20" />
				<rect x="7" y="225" rx="5" ry="5" width="100%" height="20" />
				<rect x="7" y="260" rx="5" ry="5" width="100%" height="20" />
				<rect x="7" y="295" rx="5" ry="5" width="100%" height="20" />
			</ContentLoader>
		</div>
	);
};

export default TopSpeakerLoader;
