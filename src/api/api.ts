import axios from "axios";

export const port = "http://localhost:4000";

const API = axios.create({
	baseURL: `${port}/api`,
});

export const setToken = (token: string) => {
	API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
