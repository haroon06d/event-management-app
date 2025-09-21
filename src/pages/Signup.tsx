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

	const pageStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "100vh",
		backgroundColor: "#f5f5f5",
		fontFamily: "Arial, sans-serif",
		padding: "20px",
	};

	const formStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		padding: "30px 40px",
		borderRadius: "8px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: "400px",
	};

	const inputStyle: React.CSSProperties = {
		padding: "10px 12px",
		marginBottom: "15px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		fontSize: "16px",
	};

	const selectStyle: React.CSSProperties = {
		...inputStyle,
		marginBottom: "20px",
	};

	const buttonStyle: React.CSSProperties = {
		padding: "10px 15px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		backgroundColor: "#fff",
		color: "#000",
		fontWeight: "bold",
		cursor: "pointer",
		transition: "background-color 0.2s",
	};

	return (
		<div style={pageStyle}>
			<form style={formStyle} onSubmit={handleSubmit}>
				<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Signup</h2>
				<input
					style={inputStyle}
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					style={inputStyle}
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					style={inputStyle}
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<select
					value={role}
					onChange={(e) => setRole(e.target.value)}
					style={selectStyle}
				>
					<option value="PARTICIPANT">Participant</option>
					<option value="ADMIN">Admin</option>
				</select>
				<button
					type="submit"
					style={buttonStyle}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
				>
					Signup
				</button>
			</form>
		</div>
	);
};

export default Signup;
