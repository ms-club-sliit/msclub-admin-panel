import { ToolbarConfig } from "react-rte";
import { toast } from "react-toastify";

const ApplicationConstants = {
	AUTH_NABAR_ITEMS: [
		{ id: 1, name: "Dashboard", link: "/" },
		{ id: 2, name: "Events", link: "/events" },
		{ id: 3, name: "Webinars", link: "/webinars" },
		{ id: 4, name: "Top Speakers", link: "/topSpeakers" },
		{ id: 5, name: "Applications", link: "/applications" },
		{ id: 6, name: "Inquiry", link: "/inquiries" },
	],
	AUTH_NAVBAR_OPTIONS: [
		{ id: 1, name: "My Profile", link: "/profile" },
		{ id: 2, name: "Settings", link: "/settings" },
	],
	DEFAULT_NAVBAR_ITEMS: [
		{ id: 1, name: "Sign In", link: "/signin" },
		{ id: 2, name: "Contact Admin", link: "/contact" },
	],
};

const ToolBarConfig: ToolbarConfig = {
	display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS", "LINK_BUTTONS", "BLOCK_TYPE_DROPDOWN", "HISTORY_BUTTONS"],
	INLINE_STYLE_BUTTONS: [
		{ label: "Bold", style: "BOLD", className: "custom-css-class" },
		{ label: "Italic", style: "ITALIC" },
		{ label: "Underline", style: "UNDERLINE" },
	],
	BLOCK_TYPE_DROPDOWN: [
		{ label: "Normal", style: "unstyled" },
		{ label: "Heading Large", style: "header-one" },
		{ label: "Heading Medium", style: "header-two" },
		{ label: "Heading Small", style: "header-three" },
	],
	BLOCK_TYPE_BUTTONS: [
		{ label: "UL", style: "unordered-list-item" },
		{ label: "OL", style: "ordered-list-item" },
	],
};

const toastNotification = (message: string, status: string) => {
	if (status === "success") {
		toast.success(message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	} else if (status === "error") {
		toast.error(message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	} else if (status === "warn") {
		toast.warning(message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	} else {
		toast.info(message, {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
};

export { ApplicationConstants, ToolBarConfig, toastNotification };
