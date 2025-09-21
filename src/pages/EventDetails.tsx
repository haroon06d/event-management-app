import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API, { port } from "../api/api";
import { AuthContext } from "../context/AuthContext";

interface Event {
	id: number;
	title: string;
	description: string;
	datetime: string;
	venue: string;
	organiser: string;
	participantLimit: number;
	status: "DRAFT" | "PUBLISHED" | "CANCELLED";
	image?: string;
	registrationStatus?: "CONFIRMED" | "WAITLIST" | "CANCELLED";
}

const BACKEND_URL = port;

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState<Event | null>(null);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const eventRes = await API.get(`/events/${id}`);
				let eventData: Event = eventRes.data;

				if (eventData.image && !eventData.image.startsWith("http")) {
					eventData.image = `${BACKEND_URL}${eventData.image}`;
				}

				if (user) {
					const regRes = await API.get(`/registrations/me`);
					const myReg = regRes.data.find((r: any) => r.event.id === Number(id));
					if (myReg) {
						eventData.registrationStatus = myReg.status;
					}
				}

				setEvent(eventData);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, user]);

	const handleRegister = async () => {
		if (!user) return alert("Please login first.");
		if (event?.registrationStatus) return alert("You are already registered.");

		try {
			const res = await API.post(`/registrations/${id}`);
			alert("Registered successfully!");
			setEvent(prev => prev ? { ...prev, registrationStatus: res.data.status } : prev);
		} catch (err: any) {
			alert(err.response?.data?.message || "Registration failed");
		}
	};

	if (loading) return <div>Loading...</div>;
	if (!event) return <div>Event not found.</div>;

	const containerStyle: React.CSSProperties = {
		display: "flex",
		gap: "20px",
		backgroundColor: "#fff",
		padding: "20px",
		borderRadius: "8px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
		maxWidth: "800px",
		margin: "20px auto",
		alignItems: "flex-start",
	};

	const infoStyle: React.CSSProperties = {
		flex: 1,
	};

	const imageStyle: React.CSSProperties = {
		width: "200px",
		height: "150px",
		objectFit: "cover",
		borderRadius: "6px",
	};

	const buttonStyle: React.CSSProperties = {
		marginTop: "10px",
		padding: "8px 15px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		backgroundColor: "#fff",
		cursor: "pointer",
		fontWeight: "bold",
	};

	return (
		<div style={containerStyle}>
			<div style={infoStyle}>
				<h2>{event.title}</h2>
				<p>{event.description}</p>
				<p><b>Date:</b> {new Date(event.datetime).toLocaleString()}</p>
				<p><b>Venue:</b> {event.venue}</p>
				<p><b>Organiser:</b> {event.organiser}</p>
				<p><b>Status:</b> {event.status}</p>
				{event.registrationStatus && <p><b>Your Registration:</b> {event.registrationStatus}</p>}

				{user?.role === "PARTICIPANT" && (
					<button
						style={buttonStyle}
						onClick={handleRegister}
						disabled={!!event.registrationStatus}
					>
						{event.registrationStatus ? "Already Registered" : "Register"}
					</button>
				)}
			</div>

			{event.image && <img src={event.image} alt={event.title} style={imageStyle} />}
		</div>
	);
};

export default EventDetails;
