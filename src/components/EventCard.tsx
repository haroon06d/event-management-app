import React from "react";
import { Link } from "react-router-dom";

export interface EventType {
	id: number;
	title: string;
	description: string;
	datetime: string;
	venue: string;
	organiser: string;
	participantLimit?: number;
	status: "DRAFT" | "PUBLISHED" | "CANCELLED";
	image?: string;
	registrationStatus?: "CONFIRMED" | "WAITLIST" | "CANCELLED";
}

interface EventCardProps {
	event: EventType;
	showRegistrationStatus?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, showRegistrationStatus = false }) => {
	const cardStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "flex-start",
		gap: "15px",
		padding: "15px",
		margin: "10px auto",
		backgroundColor: "#fff",
		borderRadius: "6px",
		boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
		maxWidth: "800px",
	};

	const imageStyle: React.CSSProperties = {
		width: "180px",
		height: "120px",
		objectFit: "cover",
		borderRadius: "6px",
		flexShrink: 0,
	};

	const infoStyle: React.CSSProperties = {
		flex: 1,
	};

	const linkStyle: React.CSSProperties = {
		textDecoration: "none",
		color: "#3498db",
		fontWeight: "bold",
	};

	return (
		<div style={cardStyle}>
			<div style={infoStyle}>
				<h3>
					<Link to={`/events/${event.id}`} style={linkStyle}>
						{event.title}
					</Link>
				</h3>
				<p>{event.description}</p>
				<p><b>Date:</b> {new Date(event.datetime).toLocaleString()}</p>
				<p><b>Venue:</b> {event.venue}</p>
				<p><b>Organiser:</b> {event.organiser}</p>
				<p><b>Status:</b> {event.status}</p>
				{showRegistrationStatus && event.registrationStatus && (
					<p><b>Your Registration:</b> {event.registrationStatus}</p>
				)}
			</div>
			{event.image && <img src={event.image} alt={event.title} style={imageStyle} />}
		</div>
	);
};

export default EventCard;
