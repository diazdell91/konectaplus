# Styling Guidelines (React Native)

This document defines styling best practices.

## Core Principles

Styles should be:

-   modular
-   predictable
-   localized
-   maintainable

Avoid large centralized style files.

## Local Styles

Small components can define styles inline.

Example:

``` tsx
const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
```

## Extract Styles When Needed

If styles become large, extract them.

Example:

    WalletHeader.tsx
    WalletHeader.styles.ts

## Avoid Massive StyleSheets

Bad:

    WalletScreen.tsx
      250 lines of styles

Good:

    WalletHeader.tsx
    WalletBalanceCard.tsx
    WalletList.tsx

Each component manages its own styles.

## Naming

Use semantic names.

Correct:

-   container
-   header
-   title
-   card

Avoid:

-   box1
-   view2
-   styleA

## Layout Styles

Screens may define layout styles only when necessary.

Example:

``` tsx
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
```

Avoid mixing layout styles and component styles.
