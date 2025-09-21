import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
			{user ? (
				<>
					{user.role === "ADMIN" && (
						<>
							<Link to="/admin">Admin Dashboard</Link>
							<Link to="/admin/events">Manage Events</Link>
						</>
					)}
					{user.role === "PARTICIPANT" && (
						<>
							<Link to="/dashboard">My Dashboard</Link>
							<Link to="/my-events">My Events</Link>
						</>
					)}

					<span>({user.role})</span>
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
