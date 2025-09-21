import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const [hoveredLink, setHoveredLink] = useState<number | null>(null);

	const navStyle = {
		display: "flex",
		gap: "1rem",
		padding: "1rem 2rem",
		backgroundColor: "#fafafa",
		borderBottom: "2px solid #e0e0e0",
		alignItems: "center",
		fontFamily: "Arial, sans-serif",
		color: "#333",
		boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
	};

	const linkStyle = {
		textDecoration: "none",
		color: "#555",
		padding: "0.4rem 0.8rem",
		borderRadius: "4px",
		transition: "all 0.2s",
	};

	const linkHoverStyle = {
		color: "#000",
		backgroundColor: "#f0f0f0",
		boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
	};

	const buttonStyle = {
		padding: "0.4rem 0.8rem",
		cursor: "pointer",
		border: "1px solid #ccc",
		borderRadius: "4px",
		backgroundColor: "#fff",
		color: "#333",
		fontFamily: "inherit",
		transition: "all 0.2s",
	};


	const handleMouseEnter = (index: number) => setHoveredLink(index);
	const handleMouseLeave = () => setHoveredLink(null);

	return (
		<nav style={navStyle}>
			{user ? (
				<>
					{user.role === "ADMIN" && (
						<>
							<Link
								to="/admin"
								style={hoveredLink === 0 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
								onMouseEnter={() => handleMouseEnter(0)}
								onMouseLeave={handleMouseLeave}
							>
								Admin Dashboard
							</Link>
							<Link
								to="/admin/events"
								style={hoveredLink === 1 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
								onMouseEnter={() => handleMouseEnter(1)}
								onMouseLeave={handleMouseLeave}
							>
								Manage Events
							</Link>
						</>
					)}
					{user.role === "PARTICIPANT" && (
						<>
							<Link
								to="/dashboard"
								style={hoveredLink === 2 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
								onMouseEnter={() => handleMouseEnter(2)}
								onMouseLeave={handleMouseLeave}
							>
								My Dashboard
							</Link>
							<Link
								to="/my-events"
								style={hoveredLink === 3 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
								onMouseEnter={() => handleMouseEnter(3)}
								onMouseLeave={handleMouseLeave}
							>
								My Events
							</Link>
						</>
					)}

					<span style={{ marginLeft: "auto", paddingRight: "1rem" }}>({user.role})</span>
					<button
						style={buttonStyle}
						onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
						onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
						onClick={logout}
					>
						Logout
					</button>
				</>
			) : (
				<>
					<Link
						to="/login"
						style={hoveredLink === 4 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
						onMouseEnter={() => handleMouseEnter(4)}
						onMouseLeave={handleMouseLeave}
					>
						Login
					</Link>
					<Link
						to="/signup"
						style={hoveredLink === 5 ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
						onMouseEnter={() => handleMouseEnter(5)}
						onMouseLeave={handleMouseLeave}
					>
						Signup
					</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
