# Hooks Guidelines (React Native)

This document defines rules for writing custom hooks.

## Purpose

Hooks allow separation of logic from UI.

Screens should stay clean while hooks manage logic.

## When to Create a Hook

Create a hook when a screen has:

-   multiple useState
-   side effects
-   API calls
-   derived state
-   selection logic
-   pagination
-   filtering

Example:

    hooks/
      useWalletScreen.ts

## Example Hook

``` tsx
export function useWalletScreen() {
  const [balance, setBalance] = useState(0)

  function refreshBalance() {
    // logic
  }

  return {
    balance,
    refreshBalance
  }
}
```

## Hook Naming

Hooks must start with:

use

Examples:

-   useWallet
-   useOrders
-   useProductList

## Hook Responsibilities

Hooks should:

-   manage state
-   encapsulate logic
-   expose handlers

Hooks should NOT:

-   render UI
-   return JSX

## File Structure

    hooks/
      useWalletScreen.ts
      useOrdersScreen.ts
      useProducts.ts
