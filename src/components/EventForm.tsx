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

	const formStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		gap: "12px",
		backgroundColor: "#fff",
		padding: "20px",
		borderRadius: "6px",
		boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
		maxWidth: "500px",
		margin: "20px auto",
		fontFamily: "Arial, sans-serif",
	};

	const inputStyle: React.CSSProperties = {
		padding: "10px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		fontSize: "14px",
	};

	const textareaStyle: React.CSSProperties = {
		...inputStyle,
		minHeight: "80px",
		resize: "vertical",
	};

	const selectStyle: React.CSSProperties = {
		...inputStyle,
	};

	const fileInputStyle: React.CSSProperties = {
		...inputStyle,
		padding: "5px",
	};

	const buttonStyle: React.CSSProperties = {
		backgroundColor: "#fff",
		color: "#000",
		border: "1px solid #ccc",
		padding: "10px 20px",
		borderRadius: "4px",
		cursor: "pointer",
		fontWeight: "bold",
		transition: "background-color 0.2s",
	};

	const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = "#eee";
	};

	const buttonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = "#fff";
	};

	const imageStyle: React.CSSProperties = {
		width: "150px",
		marginTop: "10px",
		borderRadius: "4px",
	};

	return (
		<form onSubmit={handleSubmit} style={formStyle}>
			<input
				required
				placeholder="Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
				style={inputStyle}
			/>
			<textarea
				required
				placeholder="Description"
				value={description}
				onChange={e => setDescription(e.target.value)}
				style={textareaStyle}
			/>
			<input
				required
				type="datetime-local"
				value={datetime}
				onChange={e => setDatetime(e.target.value)}
				style={inputStyle}
			/>
			<input
				required
				placeholder="Venue"
				value={venue}
				onChange={e => setVenue(e.target.value)}
				style={inputStyle}
			/>
			<input
				required
				placeholder="Organiser"
				value={organiser}
				onChange={e => setOrganiser(e.target.value)}
				style={inputStyle}
			/>
			<input
				required
				type="number"
				min={1}
				value={participantLimit}
				onChange={e => setParticipantLimit(+e.target.value)}
				style={inputStyle}
			/>
			<select value={status} onChange={e => setStatus(e.target.value as any)} style={selectStyle}>
				<option value="DRAFT">DRAFT</option>
				<option value="PUBLISHED">PUBLISHED</option>
				<option value="CANCELLED">CANCELLED</option>
			</select>
			<input
				type="file"
				accept="image/*"
				onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
				style={fileInputStyle}
			/>
			{imageUrl && <img src={imageUrl} alt="Event" style={imageStyle} />}
			<div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
				<button
					type="button"
					style={buttonStyle}
					onClick={() => onDone?.()}
					onMouseEnter={buttonHover}
					onMouseLeave={buttonLeave}
				>
					Cancel
				</button>
				<button
					type="submit"
					style={buttonStyle}
					onMouseEnter={buttonHover}
					onMouseLeave={buttonLeave}
				>
					Save
				</button>
			</div>

		</form>
	);
};

export default EventForm;
