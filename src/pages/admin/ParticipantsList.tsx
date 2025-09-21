import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

const ParticipantsList = () => {
	const { id } = useParams<{ id: string }>();
	const [regs, setRegs] = useState<any[]>([]);

	useEffect(() => {
		if (id) load();
	});

	const load = async () => {
		const res = await API.get(`/events/${id}/participants`);
		setRegs(res.data);
	};

	const updateStatus = async (regId: number, status: string) => {
		await API.put(`/registrations/${regId}/status`, { status });
		load();
	};

	const pageStyle: React.CSSProperties = {
		padding: "50px 20px",
		fontFamily: "Arial, sans-serif",
		backgroundColor: "#f5f5f5",
		minHeight: "100vh",
	};

	const headingStyle: React.CSSProperties = {
		textAlign: "center",
		color: "#000",
		marginBottom: "20px",
	};

	const listStyle: React.CSSProperties = {
		listStyle: "none",
		padding: 0,
		maxWidth: "600px",
		margin: "0 auto",
	};

	const listItemStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		padding: "15px",
		borderRadius: "6px",
		boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "10px",
	};

	const actionsStyle: React.CSSProperties = {
		display: "flex",
		gap: "10px",
	};

	const buttonStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		color: "#000",
		border: "1px solid #ccc",
		borderRadius: "4px",
		padding: "6px 12px",
		cursor: "pointer",
		transition: "background-color 0.2s",
	};

	return (
		<div style={pageStyle}>
			<h2 style={headingStyle}>Participants for event {id}</h2>

			{regs.length === 0 ? (
				<p style={{ textAlign: "center", color: "#555" }}>Participants aren't yet</p>
			) : (
				<ul style={listStyle}>
					{regs.map(r => (
						<li key={r.id} style={listItemStyle}>
							<div>
								{r.user.name} ({r.user.email}) — {r.status}
							</div>
							<div style={actionsStyle}>
								<button
									style={buttonStyle}
									onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
									onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
									onClick={() => updateStatus(r.id, "CONFIRMED")}
								>
									Confirm
								</button>
								<button
									style={buttonStyle}
									onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
									onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
									onClick={() => updateStatus(r.id, "WAITLIST")}
								>
									Waitlist
								</button>
								<button
									style={buttonStyle}
									onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
									onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fff")}
									onClick={() => updateStatus(r.id, "CANCELLED")}
								>
									Cancel
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ParticipantsList;
