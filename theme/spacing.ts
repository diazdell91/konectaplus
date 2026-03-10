const BASE = 8;

export const SPACING = {
  xs: BASE * 0.5,  // 4
  sm: BASE,        // 8
  md: BASE * 2,    // 16
  lg: BASE * 3,    // 24
  xl: BASE * 4,    // 32
  xxl: BASE * 6,   // 48
  xxxl: BASE * 8,  // 64

  component: {
    screenPadding: 16,
    cardPadding: 16,
    sectionGap: 24,
    buttonPaddingVertical: 14,
    buttonPaddingHorizontal: 16,
    inputPaddingVertical: 12,
    inputPaddingHorizontal: 12,
    listItemPadding: 16,
    listItemGap: 12,
  },

  layout: {
    headerHeight: 56,
    tabBarHeight: 64,
    bottomSafeArea: 34,
  },

  touch: {
    min: 44,
    comfortable: 48,
  },
} as const;

export default SPACING;
