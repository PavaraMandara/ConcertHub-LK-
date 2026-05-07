# ConcertHub LK 🎵

A full-stack web application for managing concerts, artists, suppliers, and bookings in Sri Lanka.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, Axios
- **DevOps**: Docker, GitHub Actions

---

## Project Structure

```
concerthub-lk/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── artistController.js
│   │   ├── supplierController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Artist.js
│   │   ├── Supplier.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── artistRoutes.js
│   │   ├── supplierRoutes.js
│   │   └── bookingRoutes.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetail.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   ├── Artists.jsx
│   │   │   ├── CreateArtist.jsx
│   │   │   ├── Suppliers.jsx
│   │   │   └── CreateSupplier.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

---

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Git
- Docker (optional)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/concerthub-lk.git
cd concerthub-lk
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/concerthub
JWT_SECRET=your_super_secret_key_here
```

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`

---

### 4. Running with Docker (Backend only)

```bash
cd backend
docker build -t concerthub-backend .
docker run -p 5000:5000 --env-file .env concerthub-backend
```

---

## Git Workflow

### Initial Setup

```bash
git init
git add .
git commit -m "Initial commit: ConcertHub LK project"
git branch -M main
git remote add origin https://github.com/your-username/concerthub-lk.git
git push -u origin main
```

### Branching Strategy

```bash
# Feature branch
git checkout -b feature/event-management
git add .
git commit -m "feat: add event CRUD"
git push origin feature/event-management
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get token |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| POST | `/api/events/:id/artists` | Assign artist to event |
| POST | `/api/events/:id/suppliers` | Assign supplier to event |

### Artists
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artists` | Get all artists |
| GET | `/api/artists/:id` | Get single artist |
| POST | `/api/artists` | Create artist |
| PUT | `/api/artists/:id` | Update artist |
| DELETE | `/api/artists/:id` | Delete artist |

### Suppliers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | Get all suppliers |
| GET | `/api/suppliers/:id` | Get single supplier |
| POST | `/api/suppliers` | Create supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Delete supplier |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get user's bookings |
| POST | `/api/bookings` | Book an event |
| DELETE | `/api/bookings/:id` | Cancel booking |

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/concerthub` |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123` |

---

## GitHub Actions CI

The CI pipeline (`.github/workflows/ci.yml`) runs on every push/PR to `main`:
- Installs dependencies
- Runs lint check
- Builds the frontend

---

## License

MIT
