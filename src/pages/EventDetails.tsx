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

	return (
		<div>
			<h2>{event.title}</h2>
			{event.image && (
				<img
					src={event.image}
					alt={event.title}
					style={{ maxWidth: "300px", marginTop: "10px" }}
				/>
			)}
			<p>{event.description}</p>
			<p>Date: {new Date(event.datetime).toLocaleString()}</p>
			<p>Venue: {event.venue}</p>
			<p>Organiser: {event.organiser}</p>
			<p>Status: {event.status}</p>
			{event.registrationStatus && <p>Your Registration: {event.registrationStatus}</p>}

			{user?.role === "PARTICIPANT" && (
				<button onClick={handleRegister} disabled={!!event.registrationStatus}>
					{event.registrationStatus ? "Already Registered" : "Register"}
				</button>
			)}
		</div>
	);
};

export default EventDetails;
