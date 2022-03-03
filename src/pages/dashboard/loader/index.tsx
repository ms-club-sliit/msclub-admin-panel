import React from "react";
import ContentLoader from "react-content-loader";

interface ILoaderProps {
	type: string;
}

const Loader: React.FC<ILoaderProps> = ({ type }) => {
	return (
		<div>
			{type === "overview_loader" ? (
				<ContentLoader
					speed={2}
					width={388}
					height={500}
					viewBox="0 0 388 500"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="44" y="255" rx="3" ry="3" width="86" height="34" />
					<rect x="15" y="15" rx="5" ry="5" width="370" height="220" />
					<rect x="44" y="304" rx="5" ry="5" width="119" height="15" />
					<rect x="45" y="332" rx="5" ry="5" width="54" height="28" />
					<rect x="227" y="254" rx="3" ry="3" width="86" height="34" />
					<rect x="227" y="303" rx="5" ry="5" width="119" height="15" />
					<rect x="228" y="331" rx="5" ry="5" width="54" height="28" />
				</ContentLoader>
			) : null}

			{type === "application_loader" ? (
				<ContentLoader
					speed={2}
					width={400}
					height={280}
					viewBox="0 0 400 280"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="3" ry="3" width="152" height="25" />
					<rect x="2" y="42" rx="3" ry="3" width="143" height="13" />
					<rect x="188" y="43" rx="3" ry="3" width="143" height="13" />
					<rect x="190" y="67" rx="3" ry="3" width="143" height="13" />
					<rect x="491" y="0" rx="3" ry="3" width="34" height="13" />
					<rect x="2" y="68" rx="3" ry="3" width="143" height="13" />
					<rect x="3" y="108" rx="3" ry="3" width="143" height="13" />
					<rect x="189" y="109" rx="3" ry="3" width="143" height="13" />
					<rect x="191" y="133" rx="3" ry="3" width="143" height="13" />
					<rect x="3" y="133" rx="3" ry="3" width="143" height="13" />
					<rect x="4" y="173" rx="3" ry="3" width="143" height="13" />
					<rect x="190" y="174" rx="3" ry="3" width="143" height="13" />
					<rect x="192" y="198" rx="3" ry="3" width="143" height="13" />
					<rect x="4" y="199" rx="3" ry="3" width="143" height="13" />
				</ContentLoader>
			) : null}

			{type === "status_loader" ? (
				<ContentLoader
					speed={2}
					width={400}
					height={250}
					viewBox="0 0 400 250"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="3" ry="3" width="128" height="21" />
					<rect x="173" y="85" rx="3" ry="3" width="67" height="11" />
					<circle cx="87" cy="95" r="55" />
					<rect x="173" y="111" rx="3" ry="3" width="96" height="11" />
					<rect x="6" y="178" rx="3" ry="3" width="142" height="17" />
					<rect x="265" y="177" rx="3" ry="3" width="80" height="17" />
					<rect x="7" y="207" rx="3" ry="3" width="101" height="17" />
					<rect x="265" y="206" rx="3" ry="3" width="80" height="17" />
					<rect x="174" y="58" rx="3" ry="3" width="97" height="12" />
				</ContentLoader>
			) : null}

			{type === "login_loader" ? (
				<ContentLoader
					speed={2}
					width={400}
					height={250}
					viewBox="0 0 400 250"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="3" ry="3" width="128" height="21" />
					<rect x="199" y="58" rx="3" ry="3" width="67" height="11" />
					<circle cx="159" cy="58" r="22" />
					<rect x="1" y="38" rx="3" ry="3" width="105" height="14" />
					<rect x="198" y="38" rx="3" ry="3" width="97" height="12" />
					<rect x="2" y="59" rx="3" ry="3" width="71" height="14" />
					<rect x="200" y="119" rx="3" ry="3" width="67" height="11" />
					<circle cx="160" cy="119" r="22" />
					<rect x="2" y="99" rx="3" ry="3" width="105" height="14" />
					<rect x="199" y="99" rx="3" ry="3" width="97" height="12" />
					<rect x="3" y="120" rx="3" ry="3" width="71" height="14" />
					<rect x="202" y="183" rx="3" ry="3" width="67" height="11" />
					<circle cx="162" cy="183" r="22" />
					<rect x="4" y="163" rx="3" ry="3" width="105" height="14" />
					<rect x="201" y="163" rx="3" ry="3" width="97" height="12" />
					<rect x="5" y="184" rx="3" ry="3" width="71" height="14" />
				</ContentLoader>
			) : null}
		</div>
	);
};

export default Loader;
