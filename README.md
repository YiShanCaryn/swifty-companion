# Swifty Companion

Swifty Companion is an Expo/React Native app for looking up 42 students by login and viewing their profile information.

The app uses an Express backend as a proxy for the 42 API. The backend keeps the 42 API credentials out of the client, caches the OAuth access token, and provides student data and profile images to the Expo app.

## Features

- Search for a student by 42 login
- Display the student's profile image and basic information
- Show cursus level and skills with progress bars
- List projects with marks and pass/fail status
- Run on Android, iOS, or the web through Expo
- Handle missing logins, unknown students, API failures, and request timeouts

## Requirements

- Node.js
- npm
- Expo-compatible development environment, or Expo Go for a physical device
- 42 API application credentials

Create a 42 API application to obtain a client ID and client secret. The backend reads these values from a root `.env` file:

```env
FORTYTWO_CLIENT_ID=your_client_id
FORTYTWO_CLIENT_SECRET=your_client_secret
```

Do not commit `.env` or expose these credentials in the client application.

## Installation

Install dependencies for both the Expo app and the backend:

```bash
npm install
cd backend
npm install
cd ..
```

## Running the project

### Start both services

From the project root:

```bash
make dev
```

This starts:

- Expo at the default Expo development URL
- The backend at `http://localhost:3000`

Stop both processes with `Ctrl+C`.

### Start services separately

Start the Expo app:

```bash
make frontend
```

Start the backend:

```bash
make backend
```

The Expo scripts can also be run directly:

```bash
npm start       # Expo development server
npm run android # Android
npm run ios     # iOS
npm run web     # Web
```

The backend listens on port `3000`.

### Physical devices

When running on a physical Android or iOS device, the device must be on the same local network as the development machine. The app builds the backend URL from the Expo host address and uses port `3000`.

If the device cannot reach the backend, check that:

- The backend is running.
- The computer and device are on the same network.
- Port `3000` is accessible through the computer's firewall.

## Backend API

The Express backend exposes these endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/students/:login` | Returns profile, cursus, skills, wallet, evaluations, and projects data. |
| `GET` | `/api/students/:login/image` | Proxies the student's profile image. |

The backend calls the 42 API using client-credentials OAuth and returns a user-friendly error response when credentials are missing, a login is not found, or the upstream service is unavailable.

## Project structure

```text
.
├── app/                     # Expo Router screens
│   ├── index.jsx            # Student search screen
│   └── profile.jsx          # Student profile screen
├── backend/
│   └── server.js            # Express API proxy
├── components/profile/      # Profile UI sections
├── constants/               # Theme and color definitions
├── assets/                  # App and 42 logo assets
├── app.json                 # Expo configuration
└── Makefile                 # Development commands
```

## Technology

- Expo SDK 57
- React Native 0.86
- React 19
- Expo Router
- Express 5
- Axios
- 42 API
