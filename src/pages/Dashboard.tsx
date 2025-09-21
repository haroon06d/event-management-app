import React, { useEffect, useState } from "react";
import API, { port } from "../api/api";
import EventCard, { EventType } from "../components/EventCard"

const BACKEND_URL = port;

const Dashboard = () => {
	const [events, setEvents] = useState<EventType[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await API.get("/events");
				const eventsWithFullImage = res.data.map((e: EventType) => ({
					...e,
					image: e.image && !e.image.startsWith("http") ? `${BACKEND_URL}${e.image}` : e.image,
				}));
				setEvents(eventsWithFullImage);
			} catch (err) {
				console.error(err);
			}
		};
		fetchEvents();
	}, []);

	return (
		<div style={{ padding: "40px 20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
			<h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Upcoming Events</h2>

			{events.length === 0 && <p style={{ textAlign: "center" }}>No upcoming events.</p>}

			{events.map((e) => (
				<EventCard key={e.id} event={e} showRegistrationStatus={true} />
			))}
		</div>
	);
};

export default Dashboard;
