# Screen Architecture Guidelines (React Native + Expo)

This document defines the required architecture for creating screens in
this project.

Claude must follow these rules whenever generating or refactoring
screens.

The goal is to ensure a clean, scalable, and maintainable UI
architecture.

This project uses:

-   React Native
-   Expo
-   Expo Router
-   Feature-based architecture

The code generated must follow strict separation of responsibilities.

------------------------------------------------------------------------

# 1. Core Principle

Screens must never be monolithic.

A screen must **compose smaller components** instead of implementing the
entire UI in a single file.

Avoid:

-   giant screen files
-   inline components
-   massive StyleSheet blocks
-   mixing logic, navigation, and presentation

Prefer:

-   composition
-   modular components
-   custom hooks
-   feature separation

------------------------------------------------------------------------

# 2. Expo Router Rule

Files inside `app/` must be minimal.

Route files should only reference the screen component.

### Correct pattern

Route files must always wrap the screen in an explicit component function.
Never use a bare re-export (`export default ScreenComponent`).

``` tsx
import WalletScreen from "@/features/wallet/screens/WalletScreen";

const WalletPage = () => {
  return <WalletScreen />;
};

export default WalletPage;
```

### Forbidden patterns

**Never use a bare re-export — even for simple routes:**

``` tsx
// ❌ WRONG — bare re-export, no wrapper function
import WalletScreen from "@/features/wallet/screens/WalletScreen";
export default WalletScreen;
```

**Never place inside route files:**

-   business logic
-   large components
-   UI sections
-   heavy hooks
-   large stylesheets

Route files must remain extremely small: only an import and a one-liner wrapper component.

------------------------------------------------------------------------

# 3. Screen Responsibilities

A screen is a **container / orchestrator**, not a UI dump.

A screen may:

-   consume hooks
-   manage navigation
-   connect data
-   compose UI sections

A screen must NOT:

-   implement the entire UI structure inline
-   contain large reusable components
-   contain heavy business logic
-   define many subcomponents inside the same file
-   contain massive style definitions

------------------------------------------------------------------------

# 4. Composition Rule

Screens must be built using **semantic UI sections**.

Example:

``` tsx
return (
  <ScreenContainer>
    <WalletHeader />
    <WalletBalanceCard />
    <WalletActions />
    <WalletTransactionsSection />
  </ScreenContainer>
);
```

Each section should be a separate component.

------------------------------------------------------------------------

# 5. Component Extraction Rules

Create a separate component when:

-   a section has a clear visual responsibility
-   a block has its own layout
-   the block may be reused
-   the block contains its own styles
-   the block exceeds a few lines of JSX

Avoid declaring large components inside the screen file.

### Bad

``` tsx
function WalletHeader() { ... }
function WalletBalance() { ... }
function WalletList() { ... }
```

### Correct

    components/
      WalletHeader.tsx
      WalletBalanceCard.tsx
      WalletTransactionsList.tsx

------------------------------------------------------------------------

# 6. Logic Separation

Complex logic must be extracted into **custom hooks**.

Extract logic when the screen contains:

-   multiple useState
-   side effects
-   filtering
-   selection logic
-   pagination
-   form state
-   data transformations

### Example

    hooks/
      useWalletScreen.ts

Screen:

``` tsx
const {
  balance,
  transactions,
  isLoading,
  onRefresh,
} = useWalletScreen();
```

------------------------------------------------------------------------

# 7. Styles Guidelines

Avoid large StyleSheet objects containing styles for many sections.

Rules:

-   styles should live close to the component using them
-   reusable components manage their own styles
-   screens should only contain layout styles when necessary

### Bad

    WalletScreen.tsx
      StyleSheet with 200 lines

### Better

    WalletHeader.tsx
    WalletHeader.styles.ts

or

    WalletHeader.tsx

with styles inside if small.

------------------------------------------------------------------------

# 8. Feature Folder Structure

Screens must follow a **feature-based structure**.

Example:

    src/features/wallet/
      screens/
        WalletScreen.tsx
      components/
        WalletHeader.tsx
        WalletBalanceCard.tsx
        WalletActions.tsx
        WalletTransactionsList.tsx
      hooks/
        useWalletScreen.ts
      types/
        wallet.types.ts
      constants/
        wallet.constants.ts
      utils/
        wallet.utils.ts

------------------------------------------------------------------------

# 9. Large Screen Structure

If a screen becomes complex, use nested folders.

Example:

    screens/Wallet/
      WalletScreen.tsx
      components/
        WalletHeader.tsx
        WalletBalanceCard.tsx
        WalletTransactions.tsx
      hooks/
        useWalletScreen.ts

------------------------------------------------------------------------

# 10. Smart vs Presentational Components

Separate:

Smart components - connect data - use hooks - manage navigation

Presentational components - receive props - render UI - emit callbacks

Prefer presentational components whenever possible.

------------------------------------------------------------------------

# 11. File Size Guidance

Screens should remain readable.

If a screen becomes too long:

-   extract UI sections
-   extract hooks
-   extract utils

Screens larger than \~150--200 lines should be reviewed.

------------------------------------------------------------------------

# 12. Naming Conventions

Use clear semantic naming.

Examples:

WalletScreen\
WalletHeader\
WalletBalanceCard\
WalletTransactionsList\
useWalletScreen

Avoid vague names like:

ComponentBox\
HelperView\
DataWidget\
ScreenThing

------------------------------------------------------------------------

# 13. Refactoring Rule

If an existing screen violates these rules:

Refactor by:

-   extracting UI sections
-   extracting hooks
-   simplifying the route file
-   separating styles
-   organizing feature folders

------------------------------------------------------------------------

# 14. Quality Standard

Generated code should feel like production-level React Native
architecture.

Priorities:

1.  readability
2.  maintainability
3.  scalability
4.  clear responsibilities
5.  modular composition

Never choose a monolithic implementation when a modular approach is
possible.

------------------------------------------------------------------------

# 15. Mandatory Checklist

Before generating a screen, verify:

-   Route file is minimal
-   Screen acts as a container
-   UI is composed of subcomponents
-   Complex logic moved to hooks
-   Styles are not centralized in one massive file
-   Feature folder structure is respected
-   Naming is semantic and clear

If any of these conditions fail, refactor before finishing the
implementation.
