import React, { useEffect, useState } from "react";
import API from "../../api/api";

const AdminDashboard = () => {
	const [events, setEvents] = useState<any[]>([]);
	const [totalParticipants, setTotalParticipants] = useState<number>(0);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const res = await API.get("/events");
			setEvents(res.data);
			let total = 0;
			for (const ev of res.data) {
				const regs = await API.get(`/events/${ev.id}/participants`);
				total += regs.data.length;
			}
			setTotalParticipants(total);
		} catch (err) {
			console.error(err);
		}
	};

	const pageStyle: React.CSSProperties = {
		padding: "80px 20px 20px",
		fontFamily: "Arial, sans-serif",
		backgroundColor: "#f9f9f9",
		minHeight: "100vh",
	};

	const headingStyle: React.CSSProperties = {
		textAlign: "center",
		marginBottom: "30px",
		color: "#333",
	};

	const statsContainerStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "center",
		gap: "20px",
		flexWrap: "wrap",
	};

	const cardStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		padding: "30px",
		minWidth: "200px",
		textAlign: "center",
		flex: "1",
		maxWidth: "300px",
	};

	const statValueStyle: React.CSSProperties = {
		fontSize: "24px",
		fontWeight: "bold",
		color: "#222",
	};

	const statLabelStyle: React.CSSProperties = {
		fontSize: "16px",
		color: "#555",
		marginTop: "8px",
	};

	return (
		<div style={pageStyle}>
			<h1 style={headingStyle}>Admin Dashboard</h1>
			<div style={statsContainerStyle}>
				<div style={cardStyle}>
					<div style={statValueStyle}>{events.length}</div>
					<div style={statLabelStyle}>Total Events</div>
				</div>
				<div style={cardStyle}>
					<div style={statValueStyle}>{totalParticipants}</div>
					<div style={statLabelStyle}>Total Participants</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
