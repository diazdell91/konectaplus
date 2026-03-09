# Feature Architecture Guidelines (React Native + Expo)

This document defines the required feature-based architecture for this
project.

Claude must follow these rules whenever generating, refactoring, or
reorganizing code.

The goal is to keep the codebase modular, scalable, and maintainable as
the app grows.

This project uses:

-   React Native
-   Expo
-   Expo Router
-   Feature-based architecture

------------------------------------------------------------------------

# 1. Core Principle

Code must be organized by **feature/domain**, not by broad technical
type alone.

Avoid structures where all screens, hooks, components, types, and utils
are mixed globally without clear ownership.

Prefer:

-   feature ownership
-   domain boundaries
-   local organization
-   shared modules only when truly reusable

------------------------------------------------------------------------

# 2. Default Rule

When creating new code, assume it belongs to a specific feature unless
there is a strong reason to place it in a shared/global location.

If code is only used by one feature, it must live inside that feature.

------------------------------------------------------------------------

# 3. Preferred Project Structure

Example:

``` txt
src/
  features/
    auth/
    wallet/
    topup/
    market/
    orders/
    profile/
    notifications/
  shared/
    components/
      ui/
    hooks/
    utils/
    types/
    constants/
  theme/
  lib/
```

This is preferred over a flat global structure like:

``` txt
src/
  components/
  screens/
  hooks/
  utils/
  types/
```

------------------------------------------------------------------------

# 4. Feature Ownership Rule

Every file should have clear ownership.

Examples:

-   wallet-specific UI belongs in `features/wallet`
-   topup-specific logic belongs in `features/topup`
-   market-specific types belong in `features/market`

Do NOT place feature-specific files in global folders unless they are
truly shared across multiple domains.

------------------------------------------------------------------------

# 5. What Belongs Inside a Feature

A feature may contain:

-   screens
-   components
-   hooks
-   services
-   types
-   constants
-   utils
-   mappers
-   adapters
-   state
-   validators

Example:

``` txt
src/features/wallet/
  screens/
    WalletScreen.tsx
  components/
    WalletHeader.tsx
    WalletBalanceCard.tsx
  hooks/
    useWalletScreen.ts
  services/
    wallet.service.ts
  types/
    wallet.types.ts
  constants/
    wallet.constants.ts
  utils/
    wallet.utils.ts
```

------------------------------------------------------------------------

# 6. What Belongs in Shared / Global

Shared/global code should exist only when it is reused by multiple
features and is not tied to one domain.

Examples of valid shared code:

-   base UI primitives
-   app-wide theme helpers
-   generic formatting utilities
-   cross-feature hooks
-   common TypeScript helpers
-   reusable constants used across multiple features

Examples:

``` txt
src/shared/components/ui/
  Button.tsx
  Text.tsx
  Input.tsx

src/shared/utils/
  currency.ts
  date.ts
```

------------------------------------------------------------------------

# 7. Shared Code Restrictions

Do NOT move code to shared/global just because:

-   it might be reused later
-   the feature folder feels too big
-   it looks generic but still depends on one domain

A file should only move to shared after there is clear real reuse or a
strong architectural reason.

------------------------------------------------------------------------

# 8. Feature Boundaries

Features should be loosely coupled.

A feature may consume public pieces from another feature when necessary,
but avoid deep cross-feature imports into internal implementation
details.

Prefer importing from stable entry points when possible.

Avoid patterns like:

-   feature A importing many internal files from feature B
-   shared business logic spread across unrelated features
-   circular dependencies

------------------------------------------------------------------------

# 9. Global Folder Discipline

Use global/shared folders sparingly.

### Good global folders

-   `shared/components/ui`
-   `shared/utils`
-   `shared/types`
-   `theme`
-   `lib`

### Bad usage

Putting feature code in global folders:

-   `src/components/WalletBalanceCard.tsx`
-   `src/hooks/useTopupFlow.ts`
-   `src/utils/marketFilters.ts`

These should usually live inside their respective features.

------------------------------------------------------------------------

# 10. Screen Placement Rule

Every new screen must live inside its feature.

Example:

``` txt
src/features/topup/screens/TopupHomeScreen.tsx
src/features/market/screens/MarketHomeScreen.tsx
src/features/orders/screens/OrdersScreen.tsx
```

Route files inside `app/` should only reference the screen component.

Example:

``` tsx
import TopupHomeScreen from "@/features/topup/screens/TopupHomeScreen";

export default function Page() {
  return <TopupHomeScreen />;
}
```

------------------------------------------------------------------------

# 11. Component Placement Rule

Components should live in the nearest responsible location.

Use this priority:

1.  inside the feature if feature-specific
2.  inside shared/ui if truly cross-feature and generic

Examples:

### Feature-specific

``` txt
src/features/wallet/components/WalletBalanceCard.tsx
```

### Shared

``` txt
src/shared/components/ui/Button.tsx
```

Do not place domain-specific components in shared UI.

------------------------------------------------------------------------

# 12. Hooks Placement Rule

Hooks should follow the same ownership model.

### Feature hook

``` txt
src/features/orders/hooks/useOrdersScreen.ts
```

### Shared hook

``` txt
src/shared/hooks/useDebounce.ts
src/shared/hooks/usePagination.ts
```

If a hook knows too much about one business domain, it belongs in that
feature.

------------------------------------------------------------------------

# 13. Types, Constants, and Utils Rule

Keep domain artifacts close to their feature.

### Feature-local

``` txt
src/features/market/types/market.types.ts
src/features/market/constants/market.constants.ts
src/features/market/utils/market.utils.ts
```

### Shared

``` txt
src/shared/types/api.types.ts
src/shared/utils/formatCurrency.ts
src/shared/constants/app.constants.ts
```

Do not centralize all types and utils globally by default.

------------------------------------------------------------------------

# 14. Service Layer Rule

Feature-specific services should remain inside their feature.

Examples:

``` txt
src/features/wallet/services/wallet.service.ts
src/features/orders/services/orders.service.ts
```

Generic API clients, SDK configuration, or app-wide infrastructure can
live in `lib/`.

Examples:

``` txt
src/lib/apollo.ts
src/lib/storage.ts
src/lib/env.ts
```

------------------------------------------------------------------------

# 15. Refactoring Rule

When refactoring, prefer moving code toward clearer feature ownership.

If you find:

-   domain-specific files in global folders
-   features sharing too many internal details
-   screens mixed with unrelated code

Refactor by restoring ownership and clearer boundaries.

------------------------------------------------------------------------

# 16. Naming Rule

Feature folders should use clear domain names.

Examples:

-   auth
-   wallet
-   topup
-   market
-   orders
-   profile
-   notifications

Avoid unclear or temporary names like:

-   misc
-   helpers
-   temp
-   commonStuff
-   appData

Inside each feature, use semantic names tied to the domain.

Examples:

-   WalletScreen
-   WalletBalanceCard
-   useWalletScreen
-   wallet.types.ts

------------------------------------------------------------------------

# 17. Scaling Rule

As features grow, they may introduce internal subfolders.

Example:

``` txt
src/features/market/
  screens/
    MarketHome/
      MarketHomeScreen.tsx
      components/
      hooks/
  components/
  hooks/
  services/
```

Use deeper nesting only when it improves clarity.

Do not over-engineer small features.

------------------------------------------------------------------------

# 18. Quality Standard

Generated code should preserve:

1.  clear ownership
2.  modularity
3.  maintainability
4.  scalability
5.  low coupling
6.  predictable file placement

If there is doubt between global placement and feature placement,
default to feature placement.

------------------------------------------------------------------------

# 19. Mandatory Checklist

Before generating or refactoring code, verify:

-   Every new file has clear feature ownership
-   Feature-specific code is not placed in global/shared folders
-   Shared folders only contain truly reusable code
-   Screens live inside their feature
-   Hooks follow the same ownership model
-   Types, utils, and constants remain close to their domain when
    possible
-   Cross-feature boundaries remain clean

If any of these checks fail, reorganize before finishing.
