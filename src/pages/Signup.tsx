import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("PARTICIPANT");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await API.post("/auth/signup", { name, email, password, role });
			navigate("/login");
		} catch (err: any) {
			alert(err.response?.data?.message || "Signup failed");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<select
				value={role}
				onChange={(e) => setRole(e.target.value)}
				style={{ display: "block", margin: "10px 0", padding: "5px", border: "1px solid black" }}
			>
				<option value="PARTICIPANT">Participant</option>
				<option value="ADMIN">Admin</option>
			</select>


			<button type="submit">Signup</button>
		</form>
	);
};

export default Signup;
