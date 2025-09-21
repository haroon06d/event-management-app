import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import EventDetails from "../pages/EventDetails";
import AdminDashboard from "../pages/admin/AdminDashBoard";
import ManageEvents from "../pages/admin/ManageEvents";
import ParticipantsList from "../pages/admin/ParticipantsList";
import MyEvents from "../pages/MyEvents";
import Navbar from "../components/Navbar";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
	const { user } = useContext(AuthContext);
	return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
	const { user } = useContext(AuthContext);
	return user && user.role === "ADMIN" ? <>{children}</> : <Navigate to="/" replace />;
};


const AppRoutes = () => {
	return (
		<>
			<Navbar />
			<Routes>

				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				<Route path="/" element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				} />

				<Route path="/events/:id" element={
					<RequireAuth>
						<EventDetails />
					</RequireAuth>
				} />

				<Route
					path="/my-events"
					element={
						<RequireAuth>
							<MyEvents />
						</RequireAuth>
					}
				/>

				<Route path="/admin" element={
					<RequireAuth>
						<RequireAdmin>
							<AdminDashboard />
						</RequireAdmin>
					</RequireAuth>
				} />

				<Route path="/admin/events" element={
					<RequireAuth>
						<RequireAdmin>
							<ManageEvents />
						</RequireAdmin>
					</RequireAuth>
				} />

				<Route path="/admin/events/:id/participants" element={
					<RequireAuth>
						<RequireAdmin>
							<ParticipantsList />
						</RequireAdmin>
					</RequireAuth>
				} />

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
