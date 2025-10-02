# React Movies App

FRONTEND for Team A's BootCamp Project for SKG.Education 
This project is a React application for browsing and managing movies. It features authentication, routing, a dashboard with movie listings, and detailed movie pages. The application uses local JSON files as mock data and can be extended to integrate with a backend API.

---

## Project Structure

```
src/
│ App.jsx (Root app. Sets up routing with public/private routes, renders RootLayout and main page)
│ index.css (Global CSS styles and resets)
│ main.jsx (App entry point, mounts <App /> with AuthProvider + StrictMode)
│
├───assets
│ react.svg (React logo asset for UI/branding)
│
├───components
│ ├───About
│ │ About.jsx (Static About page content)
│ │
│ ├───Auth
│ │ AuthProvider.jsx (Provides authentication context auth state/methods, manages user login/logout and persistence)
│ │ Login.jsx (Login form component, handles user credentials input and submission, Under Construction)
│ │ Register.jsx (Registration form component, collects new user info for signup, Under Construction)
│ │
│ ├───Dashboard
│ │ Dashboard.jsx (Main dashboard page, displays MoviesTable and future components like search)
│ │ MoviesTable.jsx (Displays a grid of movies, fetches data from JSON server or local JSON)
│ │ MovieTableItem.jsx (Renders a single movie card with poster, title, and metadata)
│ │
│ ├───ErrorPage
│ │ NotFoundPage.jsx (404 error / page not found)
│ │
│ ├───MoviePage
│ │ MoviePage.jsx (Displays detailed information for a single movie)
│ │
│ └───Profile
│ (empty — for user profile components)
│
├───data
│ movies.json (Static IMDb dataset, top 1000 movies)
│ movies_db.json (Same as movies.json but with Users. Used as Mock DB)
│
├───layouts
│ PrivateRoute.jsx (Protects routes for authenticated users, renders navbar + nested pages)
│ PublicRoute.jsx (Route guard for login/register. Restricts access to auth pages if logged in, renders nav + nested public pages)
│ RootLayout.jsx (Global layout: header, footer, outlet)
│
└───utils
api.js (API helpers for fetching movies/auth data)
```
---

## Features

- **Authentication**: Login and registration (under construction) with protected routes.  
- **Routing**: Public and private routes using React Router.  
- **Dashboard**: Displays a list of movies with a grid layout.  
- **Movie Details**: Each movie has a dedicated page showing detailed information.  
- **Mock Data**: Uses JSON files (`movies.json` and `movies_db.json`) as a local backend.  
- **Layouts**: Common layout components for navigation, headers, and footers.

---

## Getting Started

1. Go to client folder:
   ```bash
   cd client

2. Install dependencies:

   ```bash
    npm install

3. Run the app:

    ```bash
    npm run dev

4. Open in browser at http://localhost:5173.
