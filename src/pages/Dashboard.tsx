import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { port } from "../api/api";

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

const Dashboard = () => {
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await API.get("/events");
				const eventsWithFullImage = res.data.map((e: Event) => ({
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
		<div>
			<h1>Dashboard</h1>

			<h2>Upcoming Events</h2>
			{events.length === 0 && <p>No upcoming events.</p>}
			{events.map((e) => (
				<div key={e.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
					{e.image && <img src={e.image} alt={e.title} style={{ maxWidth: "200px", marginBottom: "10px" }} />}
					<h3>
						<Link to={`/events/${e.id}`}>{e.title}</Link>
					</h3>
					<p>{e.description}</p>
					<p>Date: {new Date(e.datetime).toLocaleString()}</p>
					<p>Venue: {e.venue}</p>
					<p>Organiser: {e.organiser}</p>
					<p>Status: {e.status}</p>
					{e.registrationStatus && <p>Your Registration: {e.registrationStatus}</p>}
				</div>
			))}
		</div>
	);
};

export default Dashboard;
