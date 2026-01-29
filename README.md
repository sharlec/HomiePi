# HomiePi

Daily habit/goal tracker: Django backend + React frontend. Core flow is register/login → create tasks → record daily completion on the dashboard.

## Tech Stack
- Backend: Django 4.2 + Django REST Framework + SimpleJWT
- Frontend: React 17 + Material UI + Webpack
- Database: SQLite (`db.sqlite3`)

## Project Structure
- `my_homie_pi/`: Django project root (contains `manage.py`)
- `my_homie_pi/API/`: backend APIs
- `my_homie_pi/frontend/`: React app + webpack config
- `my_homie_pi/frontend/static/frontend/main.js`: built bundle loaded by Django template

## Quick Start

### 1) Backend
```bash
cd /home/charles/HomiePi/my_homie_pi
python -m venv .venv
source .venv/bin/activate
pip install -r /home/charles/HomiePi/requirements.txt
python manage.py migrate
python manage.py runserver
```

If `python -m venv` fails on Ubuntu 24.04:
```bash
sudo apt-get update && sudo apt-get install -y python3.12-venv
```

Or install to user site packages (no venv):
```bash
python3 -m pip install --user --break-system-packages -r /home/charles/HomiePi/requirements.txt
```

### 2) Frontend build
```bash
cd /home/charles/HomiePi/my_homie_pi/frontend
npm install
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

### 3) Open in browser
```
http://127.0.0.1:8000/
```

## API Overview
- `POST /API/user`: register (expects `profile: {age, gender}`)
- `POST /API/login`: login (returns `access`/`refresh`)
- `GET /API/dashboard`: dashboard payload (user info + tasks + today's records)
- `GET /API/task`: list tasks for current user
- `POST /API/task`: create task
- `POST /API/record`: update record completion

Auth header:
```
Authorization: Bearer <access_token>
```

## Scheduled Job (Optional)
`recordUpdate()` generates daily records based on weekly schedule.
```bash
python manage.py crontab add
```

## Feature Checklist
- [x] User registration (age/gender profile)
- [x] JWT login
- [x] Dashboard data (user + tasks + today's records)
- [x] Create task (weekly schedule + daily repeat)
- [x] Increment/decrement record completion and persist
- [x] Logout (client clears token)
- [ ] Task edit/delete
- [ ] History/statistics views
- [ ] Richer recurrence rules
- [ ] Better form validation and error feedback

