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

	return (
		<div>
			<h2>Manage Events</h2>
			<button
				onClick={() => {
					setEditing(null);
					setShowForm(true);
				}}
			>
				Create Event
			</button>

			{showForm && (
				<EventForm
					event={editing}
					onDone={() => {
						setShowForm(false);
						load();
					}}
				/>
			)}

			<ul>
				{events.map((e) => (
					<li key={e.id}>
						<b>{e.title}</b> — {e.status} —{" "}
						{new Date(e.datetime).toLocaleString()}
						<button
							onClick={() => {
								setEditing(e);
								setShowForm(true);
							}}
						>
							Edit
						</button>
						<button onClick={() => handleDelete(e.id)}>Delete</button>
						<Link to={`/admin/events/${e.id}/participants`}>Participants</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageEvents;
