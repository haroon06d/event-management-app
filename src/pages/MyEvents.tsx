import React, { useEffect, useState } from "react";
import API, { port } from "../api/api";
import EventCard, { EventType } from "../components/EventCard"

interface RegistrationType {
	id: number;
	status: "CONFIRMED" | "WAITLIST" | "CANCELLED";
	event: EventType;
}

const BACKEND_URL = port;

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
					return { ...r, event: { ...r.event, image, registrationStatus: r.status } };
				});

				setRegistrations(updatedRegs);
			} catch (err) {
				console.error("Error fetching events:", err);
			}
		}

		fetchMyEvents();
	}, []);

	return (
		<div style={{ padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
			<h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Registered Events</h1>
			{registrations.length === 0 && <p style={{ textAlign: "center" }}>You have not registered for any events yet.</p>}

			{registrations.map((r) => (
				<EventCard key={r.id} event={r.event} showRegistrationStatus={true} />
			))}
		</div>
	);
};

export default MyEvents;
