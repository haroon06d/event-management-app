import { useEffect, useState } from "react";
import API from "../../api/api";
import EventForm from "../../components/EventForm";
import { Link } from "react-router-dom";

const ManageEvents = () => {
	const [events, setEvents] = useState<any[]>([]);
	const [editing, setEditing] = useState<any | null>(null);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		const res = await API.get("/events");
		setEvents(res.data);
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("Delete event?")) return;
		await API.delete(`/events/${id}`);
		load();
	};

	const pageStyle: React.CSSProperties = {
		padding: "80px 20px 20px",
		fontFamily: "Arial, sans-serif",
		backgroundColor: "#f5f5f5",
		minHeight: "100vh",
	};

	const headerStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		maxWidth: "800px",
		margin: "0 auto 20px",
	};

	const headingStyle: React.CSSProperties = {
		color: "#000",
		margin: 0,
	};

	const buttonStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		color: "#000",
		padding: "10px 20px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		cursor: "pointer",
		transition: "background-color 0.2s",
	};

	const listStyle: React.CSSProperties = {
		listStyle: "none",
		padding: 0,
		maxWidth: "800px",
		margin: "0 auto",
	};

	const listItemWrapperStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "15px",
	};

	const listItemStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		padding: "15px",
		borderRadius: "6px",
		boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
		flex: 1,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	const eventInfoStyle: React.CSSProperties = {
		flex: 1,
		marginLeft: "10px",
		color: "#000",
	};

	const actionsStyle: React.CSSProperties = {
		display: "flex",
		gap: "10px",
	};

	const linkButtonStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		color: "#000",
		padding: "10px 15px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		textDecoration: "none",
		transition: "background-color 0.2s",
		marginLeft: "15px",
		whiteSpace: "nowrap",
	};

	return (
		<div style={pageStyle}>
			<div style={headerStyle}>
				<h2 style={headingStyle}>Manage Events</h2>
				<button
					style={{
						...buttonStyle,
						fontWeight: "bold"
					}}
					onClick={() => {
						setEditing(null);
						setShowForm(true);
					}}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
				>
					Create Event
				</button>
			</div>

			{showForm && (
				<EventForm
					event={editing}
					onDone={() => {
						setShowForm(false);
						load();
					}}
				/>
			)}

			<ul style={listStyle}>
				{events.map((e) => (
					<li key={e.id} style={listItemWrapperStyle}>
						<div style={listItemStyle}>
							<div style={eventInfoStyle}>
								<b>{e.title}</b> — {e.status} —{" "}
								{new Date(e.datetime).toLocaleString()}
							</div>
							<div style={actionsStyle}>
								<button
									style={buttonStyle}
									onClick={() => {
										setEditing(e);
										setShowForm(true);
									}}
									onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = "#e0e0e0")}
									onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "#fff")}
								>
									Edit
								</button>
								<button
									style={buttonStyle}
									onClick={() => handleDelete(e.id)}
									onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = "#e0e0e0")}
									onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "#fff")}
								>
									Delete
								</button>
							</div>
						</div>

						<Link
							to={`/admin/events/${e.id}/participants`}
							style={linkButtonStyle}
							onMouseEnter={(ev) => (ev.currentTarget.style.backgroundColor = "#e0e0e0")}
							onMouseLeave={(ev) => (ev.currentTarget.style.backgroundColor = "#fff")}
						>
							View Participants
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageEvents;
