# BHC Jobs App

React Native app built with Expo, Expo Router, NativeWind, and Redux Toolkit.

## Prerequisites

- Node.js 18+
- npm 9+
- Android Studio (for Android emulator)
- Xcode (for iOS simulator, macOS only)

## Environment Setup

Create a `.env` file in the project root.

You can copy from `.env.example`:

```bash
cp .env.example .env
```

Set these values:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api-base-url
EXPO_PUBLIC_STORAGE_BASE_URL=https://your-storage-base-url
```

## Install Dependencies

```bash
npm install
```

## Run the App

Start Expo dev server:

```bash
npm run start
```

Run on Android (native project):

```bash
npm run android
```

Run on iOS (native project, macOS only):

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

## Project Structure

- `app/` Expo Router routes and layouts
- `components/ui/` reusable UI components
- `store/` Redux store, slices, and RTK Query services
- `types/` shared TypeScript types
- `utils/` helper utilities

## Useful Commands

Lint:

```bash
npm run lint
```

Reset starter structure script (if needed):

```bash
npm run reset-project
```

## Notes

- Auth/session state is in-memory only (not persisted across app restarts).
- Theme selection (light/dark) is persisted locally.
- Home banner wave animation uses `react-native-reanimated` and `react-native-svg`.

## Troubleshooting

If Metro cache behaves unexpectedly:

```bash
npx expo start -c
```

If Android build has stale state, stop the dev server and run:

```bash
npm run android
```
