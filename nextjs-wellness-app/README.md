# Student Wellness Monitor

A full-stack Next.js 14 application for tracking student mental health and wellness.

**Tagline:** "Check in, cheer up, and keep going!"

## Features

- 🔐 **Authentication**: Email/password and Google sign-in via Firebase Auth
- 📝 **Daily Check-ins**: Mood tracking with emojis, sliders, and notes
- 📊 **Data Visualization**: Interactive mood trend charts using Recharts
- 🤖 **AI Insights**: Personalized wellness tips (OpenAI integration ready)
- 💬 **Motivational Coach**: AI chatbot for encouragement and support
- 🔒 **Secure Data**: Firestore with proper security rules

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: OpenAI API (integration ready)
- **Charts**: Recharts

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google providers)
3. Create a Firestore database
4. Copy your Firebase config from Project Settings
5. Create `.env.local` (use `.env.local.example` as template):

```bash
cp .env.local.example .env.local
```

6. Update `.env.local` with your Firebase configuration
7. Deploy Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### 3. OpenAI Setup (Optional)

1. Get an API key from [https://platform.openai.com](https://platform.openai.com)
2. Add to `.env.local`:

```bash
OPENAI_API_KEY=your-openai-api-key
```

3. Uncomment the OpenAI code in:
   - `app/api/generate-insight/route.ts`
   - `app/api/chat/route.ts`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-wellness-app/
├── app/
│   ├── api/                 # API routes
│   │   ├── chat/           # AI chat endpoint
│   │   └── generate-insight/ # AI insights endpoint
│   ├── auth/               # Authentication page
│   ├── dashboard/          # Main dashboard (protected)
│   ├── components/         # React components
│   │   ├── AuthProvider.tsx
│   │   ├── Header.tsx
│   │   ├── DailyCheckIn.tsx
│   │   ├── MoodChart.tsx
│   │   ├── AIInsights.tsx
│   │   └── MotivationalCoach.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page (redirects)
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   ├── auth.ts            # Authentication helpers
│   └── firestore.ts       # Database operations
├── firestore.rules        # Firestore security rules
└── README.md
```

## Firebase Security Rules

The included Firestore rules ensure:
- Users can only access their own mood entries
- Authenticated users can create mood entries
- All other access is denied

## Environment Variables

Required environment variables (see `.env.local.example`):

- `NEXT_PUBLIC_FIREBASE_*`: Firebase configuration
- `OPENAI_API_KEY`: OpenAI API key (optional)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## Features in Detail

### Authentication
- Email/password signup and login
- Google OAuth integration
- Protected routes with automatic redirection
- User session management

### Mood Tracking
- Emoji-based mood selection
- 1-10 mood scale slider
- Optional notes for each check-in
- Data saved to Firestore with proper security

### Data Visualization
- Weekly mood trends using Recharts
- Responsive charts that work on mobile
- Mock data shown when no real data exists
- Real-time data updates from Firestore

### AI Features
- Wellness insights generation (ready for OpenAI)
- Motivational chatbot interface
- Context-aware responses
- Clearly marked placeholder implementations

## Development Notes

- All AI features include placeholder implementations
- Real OpenAI integration requires uncommenting code and adding API key
- Security rules prevent users from accessing others' data
- Responsive design works on mobile and desktop
- Includes loading states and error handling

## License

MIT License - feel free to use this code for your own projects!