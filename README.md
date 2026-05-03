# PhotoSharing App

## Overview
A photo sharing mobile app built with React Native and Expo as a learning project, 
working towards building a music recommendation app.

## Tech Stack
- **Framework:** React Native with Expo (SDK 55)
- **Language:** TypeScript
- **Styling:** NativeWind / Tailwind CSS
- **Backend:** Supabase (authentication + database)
- **Media Storage:** Cloudinary
- **Navigation:** Expo Router

## Features
- Camera integration for taking photos
- User authentication via Supabase
- Photo upload and storage via Cloudinary
- Share specific events with users
- Allow users to create their own events
- Users can only access their events and events shared to them by other users
- Dark mode UI

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npx expo start`

## Environment Variables
Create a `.env` file in the root directory with:
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key