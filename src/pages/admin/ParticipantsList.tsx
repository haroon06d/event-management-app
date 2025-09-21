import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

const ParticipantsList = () => {
	const { id } = useParams<{ id: string }>();
	const [regs, setRegs] = useState<any[]>([]);

	useEffect(() => {
		if (id) load();
	});

	const load = async () => {
		const res = await API.get(`/events/${id}/participants`);
		setRegs(res.data);
	};

	const updateStatus = async (regId: number, status: string) => {
		await API.put(`/registrations/${regId}/status`, { status });
		load();
	};

	return (
		<div>
			<h2>Participants for event {id}</h2>
			<ul>
				{regs.map(r => (
					<li key={r.id}>
						{r.user.name} ({r.user.email}) — {r.status}
						<button onClick={() => updateStatus(r.id, "CONFIRMED")}>Confirm</button>
						<button onClick={() => updateStatus(r.id, "WAITLIST")}>Waitlist</button>
						<button onClick={() => updateStatus(r.id, "CANCELLED")}>Cancel</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ParticipantsList;
