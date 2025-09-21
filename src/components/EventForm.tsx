import React, { useState, useEffect } from "react";
import API from "../api/api";

interface Props {
	event?: any;
	onDone?: () => void;
}

const EventForm: React.FC<Props> = ({ event, onDone }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [datetime, setDatetime] = useState("");
	const [venue, setVenue] = useState("");
	const [organiser, setOrganiser] = useState("");
	const [participantLimit, setParticipantLimit] = useState(10);
	const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "CANCELLED">("PUBLISHED");
	const [image, setImage] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		if (event) {
			setTitle(event.title);
			setDescription(event.description);
			setDatetime(new Date(event.datetime).toISOString().slice(0, 16));
			setVenue(event.venue);
			setOrganiser(event.organiser);
			setParticipantLimit(event.participantLimit);
			setStatus(event.status);
			setImageUrl(event.image || "");
		}
	}, [event]);

	const handleImageUpload = async (file: File): Promise<string | null> => {
		const formData = new FormData();
		formData.append("image", file);

		try {
			const res = await API.post("/events/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setImageUrl(res.data.url);
			return res.data.url;
		} catch (err: any) {
			alert(err.response?.data?.message || "Image upload failed");
			return null;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		let finalImageUrl = imageUrl;

		if (image) {
			const uploadedUrl = await handleImageUpload(image);
			if (uploadedUrl) finalImageUrl = uploadedUrl;
		}

		const payload = {
			title,
			description,
			datetime,
			venue,
			organiser,
			participantLimit,
			status,
			image: finalImageUrl,
		};

		try {
			if (event) {
				await API.put(`/events/${event.id}`, payload);
			} else {
				await API.post("/events", payload);
			}
			onDone?.();
		} catch (err: any) {
			alert(err.response?.data?.message || "Error saving event");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				required
				placeholder="Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<textarea
				required
				placeholder="Description"
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<input
				required
				type="datetime-local"
				value={datetime}
				onChange={e => setDatetime(e.target.value)}
			/>
			<input
				required
				placeholder="Venue"
				value={venue}
				onChange={e => setVenue(e.target.value)}
			/>
			<input
				required
				placeholder="Organiser"
				value={organiser}
				onChange={e => setOrganiser(e.target.value)}
			/>
			<input
				required
				type="number"
				min={1}
				value={participantLimit}
				onChange={e => setParticipantLimit(+e.target.value)}
			/>
			<select value={status} onChange={e => setStatus(e.target.value as any)}>
				<option value="DRAFT">DRAFT</option>
				<option value="PUBLISHED">PUBLISHED</option>
				<option value="CANCELLED">CANCELLED</option>
			</select>

			<input
				type="file"
				accept="image/*"
				onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
			/>
			{imageUrl && <img src={imageUrl} alt="Event" style={{ width: 150, marginTop: 10 }} />}

			<button type="submit">Save</button>
		</form>
	);
};

export default EventForm;
