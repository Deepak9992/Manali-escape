# Manali Escape 🏔

A full-stack tourism website for Himachal Pradesh built with Node.js and Express.

## Features
- 8 pages: Home, Destinations, Adventure, Heritage, Cuisine, Festivals, Taxi, Booking, Contact
- AI-powered voice chatbox (Ollama + Web Speech API)
- Trip booking with cost estimator
- WhatsApp notifications via Twilio on booking
- GPS + Google Maps integration on destinations
- Taxi directory with fare estimator
- Responsive design with Playfair Display + Inter fonts

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML/CSS/JS
- **Notifications:** Twilio WhatsApp Sandbox, Nodemailer
- **AI Chatbox:** Ollama (tinyllama model)

## Project Structure
```
himachal-tourism/
├── app.js                  # Express entry point
├── routes/index.js         # All routes
├── controllers/            # Page + API controllers
├── services/               # Notification + data services
├── views/                  # HTML pages + chatbox.js
│   └── images/             # Logo and assets
├── .env                    # Environment variables (not committed)
└── package.json
```

## Local Setup

```bash
# Install dependencies
npm install

# Copy env template and fill in your values
cp .env.example .env

# Start server
npm start
```

Visit `http://localhost:3000`

## Environment Variables

| Variable | Description |
|---|---|
| `TWILIO_ACCOUNT_SID` | Twilio Account SID (starts with AC) |
| `TWILIO_AUTH_TOKEN` | Twilio Auth Token |
| `TWILIO_PHONE_NUMBER` | `whatsapp:+14155238886` (sandbox) |
| `ADMIN_PHONE` | Your WhatsApp number e.g. `whatsapp:+91XXXXXXXXXX` |
| `ADMIN_EMAIL` | Admin email for notifications |
| `SMTP_USER` | Gmail address for SMTP |
| `SMTP_PASS` | Gmail App Password |
| `PORT` | Server port (default: 3000) |

## Docker

```bash
docker build -t manali-escape .
docker run -p 3000:3000 --env-file .env manali-escape
```

## Deployment

See `.github/workflows/deploy.yml` for CI/CD pipeline.

---

© 2026 Manali Escape | [manaliescape.in](http://manaliescape.in)
