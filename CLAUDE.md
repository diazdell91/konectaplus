# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android

# Lint
npm run lint
```

There is no test suite configured in this project.

Set `EXPO_PUBLIC_GRAPHQL_URL` to point to the GraphQL backend (defaults to `http://localhost:4000/graphql`).

## Architecture

**KonectaPlus** is an Expo (SDK 55) React Native app using file-based routing via Expo Router. It targets iOS and Android (portrait only).

### Routing & Navigation

`app/` uses Expo Router's file-based routing with two route groups:

- `(auth)/` — unauthenticated flow: phone entry → OTP verification → onboarding. The `(auth)/_layout.tsx` guards the onboarding route (redirects if already onboarded).
- `(tabs)/` — authenticated app with two tabs: Inicio (home) and Perfil (profile).

The root `app/_layout.tsx` controls which group is shown based on auth state (via `AuthContext`).

### Provider Stack (root layout)

Providers wrap in this order:
1. `GestureHandlerRootView` — gesture support
2. `ApolloProvider` — GraphQL client
3. `AuthProvider` — auth state & mutations
4. `AppSettingsProvider` — persistent app settings
5. `KeyboardProvider` — keyboard handling
6. `PressablesConfig` — haptics + press animations (pressto)

### State Management

No Redux/Zustand — state lives in two React Contexts:

- **`context/AuthProvider.tsx`** — holds `accessToken`, `refreshToken`, `user`, `sessionId`. Persists to `expo-sqlite/kv-store`. Exposes `setAuth`, `clearAuth`, `getAccessToken`, `getRefreshToken`, and GraphQL mutation wrappers (`requestOtp`, `verifyOtp`, `logout`).
- **`context/AppSettings.tsx`** — holds onboarding state, paywall flags, etc. Also persists to `expo-sqlite/kv-store`.

### GraphQL / Apollo

`apollo/apolloClient.tsx` configures the Apollo Client with:
- Auth link that injects Bearer tokens from `AuthProvider`
- Error link that handles `TOKEN_EXPIRED`/`UNAUTHENTICATED` — uses RxJS to queue and retry requests during token refresh
- Default policies: `watchQuery: cache-and-network`, `query: cache-first`, `mutate: no-cache`

### Design System

All design tokens live in `theme/`:
- `colors.ts` — full palette; primary green `#09816c`, secondary orange `#FF830C`
- `spacing.ts` — 8px base unit, named scale (xs=4px → xxxl=64px), component-specific tokens like `screenPadding` (16px)
- `typography.ts` — Montserrat font family, named variants (h1–h4, body, caption, button, etc.)
- `components.ts` — shared component style tokens

Use `components/ui/Text.tsx` (with variant props like `body`, `h1`, `caption`) and `components/ui/Button.tsx` (with `variant` prop: primary/secondary/outline/ghost/success) for all standard UI. Import from the barrel files `components/ui/index.tsx` and `components/index.ts`.

### Component Organization

- `components/ui/` — atomic design-system components (Button, Text, Input, Screen, FormScreen, etc.)
- `components/screens/` — full-screen components used by routes (Profile, OmboardingScreen)
- `components/profile/` — sub-components specific to the Profile screen
- `components/svg/` — custom SVG icon components
- `components/otp/` — OTP input component
- `utils/phoneUS.ts` — US phone formatting and NANP validation helpers

### Path Aliases

`@/*` maps to the project root (e.g., `@/theme/colors`, `@/context/AuthProvider`).

### Animations

Uses `react-native-reanimated` v4. Reanimated warning logs are suppressed in the root layout for pressto library compatibility. Use `react-native-gesture-handler` for gesture-driven interactions.

### Notifications / Toasts

`sonner-native` — `<Toaster />` is mounted in the root layout. Use `toast()` calls anywhere in the app.
