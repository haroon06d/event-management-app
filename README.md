# Frontend Setup Instructions

This frontend is a **React + TypeScript** application for the Event Management System. It communicates with the backend to handle authentication, event browsing, registration, and admin management.

---

## 1. Clone the Repo

```bash
git clone https://github.com/haroon06d/event-management-app.git
cd event-management-app
```
## 2. Install Dependencies

Install all frontend dependencies:
```bash
npm install
```

#### Dependencies include:

- react – UI library
- react-dom – DOM rendering for React
- react-router-dom – Routing for SPA
- axios – API requests
- jwt-decode – Decode JWT tokens
- react-scripts – Scripts for React app
- @testing-library/* – Testing utilities

#### Dev Dependencies:

- typescript – TypeScript support
- @types/react / @types/react-dom – Type definitions

## 3. App Routes

- /login > Login page
- /signup > Signup page
- / > Participant Dashboard (requires login)
- /events/:id > Event Details (requires login)
- /my-events > My Registered Events (requires login)
- /admin > Admin Dashboard (requires admin login)
- /admin/events > Manage Events (requires admin login)
- /admin/events/:id/participants > Participants List (requires admin login)
- Any undefined route (*) will redirect to /.

## 4. Running the Frontend
```bash
npm start
```

##### The frontend will run at http://localhost:3000

###### NB: make sure backend is running :)
