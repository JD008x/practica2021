
const env = getEnv();  export { env };

function getEnv() {
	// use process.env, process.argv
	return {
		PORT: 80,
		NODE_ENV: "development",
		DISCOVERY_CLIENT_ROUTE: "/discovery/client",
		USER_ROUTE: "/api/user",
		CATEGORY_ROUTE: "/api/category",
		MONGO_URL: "mongodb+srv://admin:admin123@cluster0.avhl5.mongodb.net/PracticaWaters?retryWrites=true&w=majority",
		DB_NAME: "PracticaWaters"
	};

}
