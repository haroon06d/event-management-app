import React, { useEffect, useState } from "react";
import API from "../../api/api";

const AdminDashboard = () => {
	const [events, setEvents] = useState<any[]>([]);
	const [totalParticipants, setTotalParticipants] = useState<number>(0);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const res = await API.get("/events");
			setEvents(res.data);
			let total = 0;
			for (const ev of res.data) {
				const regs = await API.get(`/events/${ev.id}/participants`);
				total += regs.data.length;
			}
			setTotalParticipants(total);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<div>Total events: {events.length}</div>
			<div>Total participants (all events): {totalParticipants}</div>
		</div>
	);
};

export default AdminDashboard;
