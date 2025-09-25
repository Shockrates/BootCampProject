# Bootcamp Project — SKG.Education (Team A)

> Full-stack mockup project built by **Team A** during the **SKG.Education** bootcamp.

This repository contains two top-level folders:

- `server/` — Backend (Node.js + Express, MongoDB)
- `client/` — Frontend (React + Vite)

---

## 🚀 Quick start

1. Clone the repository and enter it:
    
    git clone <repository-url>
    cd <repository-name>

---

## 🖥 Backend — `server/`

**1. Enter the server folder**
    
    cd server

**2. Install dependencies**
    
    npm install

**3. Environment file**
- Rename or copy the example env file to `.env`:

- Open `.env` and replace `MONGO_URI` with your MongoDB connection string.  
  **Important:** You must create a MongoDB cluster (for example: MongoDB Atlas) and use its connection URI. Example value:

    MONGO_URI="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority"

> Make sure the username/password and database name are correct and the cluster IP access / network settings allow connections (or add your IP / 0.0.0.0/0 temporarily for testing in Atlas).

**4. Start the dev server**
    
    npm run dev

**5. Test the API**
- Visit in browser or test with Postman / curl:

    http://localhost:3000

---

## 🌐 Frontend — `client/`

**1. Enter the client folder**
    
    cd client

**2. Install dependencies**
    
    npm install

**3. Start the frontend dev server**
    
    npm run dev

**4. Open the app**
- Visit:

    http://localhost:5173/

---

## 📂 Project structure (top-level)

    .
    ├── client/   # React + Vite frontend
    └── server/   # Node.js + Express backend

(Each folder contains its own package.json and README/notes specific to that part.)

---

## 🔧 Scripts (common)

- Backend (inside `server/`):
    - `npm install` — install backend deps
    - `npm run dev` — start dev server (uses nodemon or equivalent)

- Frontend (inside `client/`):
    - `npm install` — install frontend deps
    - `npm run dev` — start Vite dev server

---

## ✅ Checklist before running

- [ ] You have Node.js (v16+ recommended) and npm installed.
- [ ] You created a MongoDB cluster (Atlas) or have a running MongoDB instance.
- [ ] `.env` in `server/` contains a valid `MONGO_URI`.
- [ ] Ports 3000 (backend) and 5173 (frontend) are free or adjusted in config.

---

## 🐞 Troubleshooting

- **Cannot connect to MongoDB:** check `MONGO_URI`, Atlas IP access list, username/password, and network/firewall rules.
- **Port already in use:** change `PORT` in `.env` (and update how you call the server) or stop the process using the port.
- **Frontend not loading:** ensure `npm install` ran successfully in `client/` and run `npm run dev` inside `client/`.


---

