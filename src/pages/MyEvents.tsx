import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

interface EventType {
	id: number;
	title: string;
	description: string;
	datetime: string;
	venue: string;
	organiser: string;
	participantLimit: number;
	status: "DRAFT" | "PUBLISHED" | "CANCELLED";
	image?: string;
}

interface RegistrationType {
	id: number;
	status: "CONFIRMED" | "WAITLIST" | "CANCELLED";
	event: EventType;
}

const BACKEND_URL = "http://localhost:4000";

const MyEvents: React.FC = () => {
	const [registrations, setRegistrations] = useState<RegistrationType[]>([]);

	useEffect(() => {
		async function fetchMyEvents() {
			try {
				const res = await API.get("/registrations/me");

				const updatedRegs: RegistrationType[] = res.data.map((r: RegistrationType) => {
					const image = r.event.image && !r.event.image.startsWith("http")
						? `${BACKEND_URL}${r.event.image}`
						: r.event.image;
					return { ...r, event: { ...r.event, image } };
				});

				setRegistrations(updatedRegs);
			} catch (err) {
				console.error("Error fetching events:", err);
			}
		}

		fetchMyEvents();
	}, []);

	return (
		<div>
			<h1>My Registered Events</h1>
			{registrations.length === 0 && <p>You have not registered for any events yet.</p>}

			{registrations.map((r) => (
				<div key={r.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
					{r.event.image && <img src={r.event.image} alt={r.event.title} style={{ maxWidth: "200px" }} />}
					<h3><Link to={`/events/${r.event.id}`}>{r.event.title}</Link></h3>
					<p>{r.event.description}</p>
					<p>Date: {new Date(r.event.datetime).toLocaleString()}</p>
					<p>Venue: {r.event.venue}</p>
					<p>Organiser: {r.event.organiser}</p>
					<p>Status: {r.event.status}</p>
					<p>Your Registration: {r.status}</p>
				</div>
			))}
		</div>
	);
};

export default MyEvents;
