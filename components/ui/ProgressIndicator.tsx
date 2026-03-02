import { COLORS, SPACING, TYPOGRAPHY } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./Text";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabel,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${progressPercentage}%` }]}
        />
      </View>
      <Text style={styles.progressText}>
        Paso {currentStep} de {totalSteps} • {stepLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.neutral.gray200,
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary.main,
    borderRadius: 2,
  },
  progressText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.secondary,
  },
});

export default ProgressIndicator;
