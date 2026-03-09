# Component Guidelines (React Native)

This document defines best practices for creating UI components.

## Core Principles

Components should be: - small - reusable - predictable - easy to test -
easy to compose

Avoid creating large multi-purpose components.

## Component Types

### Presentational Components

Responsible only for rendering UI.

Characteristics: - receive props - no business logic - minimal state -
reusable

Example:

``` tsx
type BalanceCardProps = {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return <Text>{balance}</Text>
}
```

### Container Components

Responsible for connecting data and orchestrating UI.

Characteristics: - uses hooks - composes presentational components

## File Naming

Use semantic names.

Correct: - WalletBalanceCard - OrdersList - ProductCard

Avoid: - BoxComponent - HelperView - UIThing

## Folder Structure

    components/
      WalletBalanceCard.tsx
      WalletHeader.tsx
      WalletTransactionItem.tsx

## Component Size

If a component: - exceeds \~120 lines - contains multiple UI sections -
has many props

Consider splitting it.

## Props Guidelines

Props should be: - typed - minimal - descriptive

Avoid passing unnecessary props.
