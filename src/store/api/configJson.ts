const requestConfigJson = {
	headers: {
		Authorization: localStorage.getItem("token") || "",
		"Content-type": "application/json",
	},
};

export default requestConfigJson;
