const configs = {
	storage: {
		bucketUrl: process.env.REACT_APP_STORAGE_BUCKET_URL ?? "",
		bucketName: process.env.REACT_APP_STORAGE_BUCKET_NAME ?? "",
		storageUrl: `${process.env.REACT_APP_STORAGE_BUCKET_URL}/${process.env.REACT_APP_STORAGE_BUCKET_NAME}/`,
	},
	api: {
		baseUrl: process.env.REACT_APP_API_ENDPOINT ?? "",
	},
	app: {
		env: process.env.NODE_ENV ?? "development",
	},
	scheduler: {
		url: process.env.REACT_APP_MS_SCHEDULER ?? "",
	},
};

export default configs;
