/**
 * TopupTypeTabs
 *
 * Segmented control with three tabs:
 *   Recargas  → VOUCHER
 *   Paquetes  → BUNDLE
 *   Datos     → DATA
 *
 * Tabs with 0 items are rendered as disabled (greyed out, non-pressable).
 */

import { TopupListingType } from "@/graphql/adminTopupProductListings";
import COLORS from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

interface TabDef {
  type: TopupListingType;
  label: string;
}

const TABS: TabDef[] = [
  { type: "VOUCHER", label: "Recargas" },
  { type: "BUNDLE", label: "Paquetes" },
  { type: "DATA", label: "Datos" },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  counts: Record<TopupListingType, number>;
  selectedType: TopupListingType;
  onSelectType: (type: TopupListingType) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TopupTypeTabs = ({ counts, selectedType, onSelectType }: Props) => {
  // Only show tabs that have at least one item (or the currently selected one)
  const visibleTabs = TABS.filter(
    (t) => counts[t.type] > 0 || t.type === selectedType,
  );

  if (visibleTabs.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      {visibleTabs.map((tab) => {
        const isSelected = tab.type === selectedType;
        const isDisabled = counts[tab.type] === 0;

        return (
          <Pressable
            key={tab.type}
            style={({ pressed }) => [
              styles.tab,
              isSelected && styles.tabSelected,
              isDisabled && styles.tabDisabled,
              pressed && !isDisabled && styles.tabPressed,
            ]}
            onPress={() => {
              if (!isDisabled) onSelectType(tab.type);
            }}
            disabled={isDisabled}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isSelected, disabled: isDisabled }}
          >
            <Text
              style={[
                styles.tabLabel,
                isSelected && styles.tabLabelSelected,
                isDisabled && styles.tabLabelDisabled,
              ]}
            >
              {tab.label}
            </Text>
            {counts[tab.type] > 0 && (
              <View
                style={[
                  styles.countBadge,
                  isSelected && styles.countBadgeSelected,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    isSelected && styles.countTextSelected,
                  ]}
                >
                  {counts[tab.type]}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default TopupTypeTabs;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.neutral.gray100,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  tabSelected: {
    backgroundColor: COLORS.surface.primary,
    borderColor: COLORS.primary.main,
  },
  tabDisabled: {
    opacity: 0.4,
  },
  tabPressed: {
    opacity: 0.75,
  },
  tabLabel: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.text.secondary,
  },
  tabLabelSelected: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontWeight: "600",
    color: COLORS.primary.main,
  },
  tabLabelDisabled: {
    color: COLORS.neutral.gray400,
  },
  countBadge: {
    backgroundColor: COLORS.neutral.gray200,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: "center",
  },
  countBadgeSelected: {
    backgroundColor: COLORS.primary.main,
  },
  countText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.text.secondary,
  },
  countTextSelected: {
    color: COLORS.neutral.white,
  },
});
