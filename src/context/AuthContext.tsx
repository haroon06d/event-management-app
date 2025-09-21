import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API, { setToken } from "../api/api";

type Role = "ADMIN" | "PARTICIPANT";

interface User {
	id: number;
	role: Role;
	name?: string;
	email?: string;
}

interface AuthContextType {
	user: User | null;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	login: () => { },
	logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		setToken(token);
		const decoded: any = jwtDecode(token);
		setUser({ id: decoded.userId, role: decoded.role, name: decoded.name, email: decoded.email });
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		API.defaults.headers.common["Authorization"] = "";
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded: any = jwtDecode(token);
				const now = Date.now() / 1000;
				if (decoded.exp && decoded.exp < now) {
					logout();
				} else {
					setToken(token);
					setUser({ id: decoded.userId, role: decoded.role, name: decoded.name, email: decoded.email });
				}
			} catch {
				logout();
			}
		}
		setLoading(false);
	}, []);

	if (loading) return <div>Loading...</div>;

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

