import React, { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await API.post("/auth/login", { email, password });
			const token = res.data.token;
			login(token);
			if (res.data.user.role === "ADMIN") navigate("/admin");
			else navigate("/");
		} catch (err: any) {
			alert(err.response?.data?.message || "Login failed");
		}
	};


	return (
		<form onSubmit={handleSubmit}>
			<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
