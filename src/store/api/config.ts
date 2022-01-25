const requestConfig = {
	headers: {
		Authorization: localStorage.getItem("token") || "",
		"Content-type": "multipart/form-data",
	},
};

export default requestConfig;
