import React, { Activity, useCallback, useMemo } from "react";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

type TabItem = { key: string; title: string };

type Props = {
  tabs: TabItem[];
  index: number;
  onIndexChange: (i: number) => void;
  renderPage: (tabKey: string) => React.ReactNode;
  height?: number; // alto del pager si quieres fijo
};

const SPRING_CONFIG = {
  damping: 60,
  stiffness: 400,
} as const;

function clampIndex(nextIndex: number, totalTabs: number) {
  if (totalTabs <= 0) return 0;
  return Math.max(0, Math.min(totalTabs - 1, nextIndex));
}

export default function SegmentedTopTabsPager({
  tabs,
  index,
  onIndexChange,
  renderPage,
  height,
}: Props) {
  const tabCount = tabs.length;
  const safeIndex = clampIndex(index, tabCount);

  const { width } = useWindowDimensions();
  const pageWidth = Math.max(1, width);

  const pageX = useSharedValue(-safeIndex * pageWidth);
  const dragStartX = useSharedValue(0);

  // Mantén pageX sincronizado cuando cambie index desde afuera
  React.useEffect(() => {
    if (index !== safeIndex) {
      onIndexChange(safeIndex);
    }

    if (tabCount === 0) {
      pageX.value = 0;
      return;
    }

    pageX.value = withSpring(-safeIndex * pageWidth, SPRING_CONFIG);
  }, [index, onIndexChange, pageWidth, pageX, safeIndex, tabCount]);

  const snapTo = useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, tabCount);
      if (clamped !== safeIndex) {
        onIndexChange(clamped);
      }
    },
    [onIndexChange, safeIndex, tabCount],
  );

  const pan = useMemo(() => {
    return Gesture.Pan()
      .enabled(tabCount > 1)
      .runOnJS(true)
      .onBegin(() => {
        dragStartX.value = pageX.value;
      })
      .onUpdate((e) => {
        const next = dragStartX.value + e.translationX;

        // clamp (no overscroll)
        const minX = -Math.max(tabCount - 1, 0) * pageWidth;
        const maxX = 0;
        pageX.value = Math.max(minX, Math.min(maxX, next));
      })
      .onEnd((e) => {
        // decidir a qué página ir
        const raw = -pageX.value / pageWidth;

        // “flick” support
        const velocityBoost = e.velocityX * -0.0006; // ajustable
        const target = Math.round(raw + velocityBoost);

        const clamped = clampIndex(target, tabCount);
        pageX.value = withSpring(-clamped * pageWidth, SPRING_CONFIG);
        snapTo(clamped);
      });
  }, [dragStartX, pageWidth, pageX, snapTo, tabCount]);

  const onPressTab = useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, tabCount);
      pageX.value = withSpring(-clamped * pageWidth, SPRING_CONFIG);
      if (clamped !== safeIndex) {
        onIndexChange(clamped);
      }
    },
    [onIndexChange, pageWidth, pageX, safeIndex, tabCount],
  );

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pageX.value }],
  }));

  if (tabCount === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <SegmentedHeader
        tabs={tabs}
        index={safeIndex}
        pageX={pageX}
        onPressTab={onPressTab}
        pageWidth={pageWidth}
      />

      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, overflow: "hidden" }}>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: pageWidth * tabCount,
                ...(height !== undefined ? { height } : { flex: 1 }),
              },
              containerStyle,
            ]}
          >
            {tabs.map((t, i) => {
              // Keep adjacent pages active so swipe transitions stay filled.
              const mode = Math.abs(i - safeIndex) <= 1 ? "visible" : "hidden";
              return (
                <View key={t.key} style={{ width: pageWidth, flex: 1 }}>
                  <Activity mode={mode}>{renderPage(t.key)}</Activity>
                </View>
              );
            })}
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
}

function SegmentedHeader({
  tabs,
  index,
  pageX,
  onPressTab,
  pageWidth,
}: {
  tabs: { key: string; title: string }[];
  index: number;
  pageX: SharedValue<number>;
  onPressTab: (i: number) => void;
  pageWidth: number;
}) {
  const hasLiquidGlass = isLiquidGlassAvailable();
  const segmentW = (pageWidth - 32) / Math.max(tabs.length, 1); // 16 padding each side
  const indicatorStyle = useAnimatedStyle(() => {
    const progress = -pageX.value / pageWidth; // 0..N
    return {
      transform: [{ translateX: progress * segmentW }],
    };
  });

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 }}>
      <GlassView
        glassEffectStyle={hasLiquidGlass ? "regular" : "none"}
        style={{
          height: 44,
          borderRadius: 14,
          backgroundColor: hasLiquidGlass ? "transparent" : "rgba(255,255,255,0.86)",
          borderWidth: hasLiquidGlass ? 0 : 1,
          borderColor: "rgba(15,23,42,0.08)",
          padding: 4,
          flexDirection: "row",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* indicador */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              left: 4,
              top: 4,
              width: segmentW - 0,
              height: 36,
            },
            indicatorStyle,
          ]}
        >
          <GlassView
            glassEffectStyle={hasLiquidGlass ? "clear" : "none"}
            style={{
              flex: 1,
              borderRadius: 12,
              backgroundColor: hasLiquidGlass
                ? "rgba(255,255,255,0.14)"
                : "rgba(255,255,255,0.92)",
              borderWidth: hasLiquidGlass ? 0 : 1,
              borderColor: "rgba(15,23,42,0.08)",
              boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          />
        </Animated.View>

        {tabs.map((t, i) => (
          <Pressable
            key={t.key}
            onPress={() => onPressTab(i)}
            style={{
              width: segmentW,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <TabLabel
              title={t.title}
              active={i === index}
              pageX={pageX}
              i={i}
              pageWidth={pageWidth}
            />
          </Pressable>
        ))}
      </GlassView>
    </View>
  );
}

function TabLabel({
  title,
  active,
  pageX,
  i,
  pageWidth,
}: {
  title: string;
  active: boolean;
  pageX: SharedValue<number>;
  i: number;
  pageWidth: number;
}) {
  const textStyle = useAnimatedStyle(() => {
    const progress = -pageX.value / pageWidth; // 0..N
    const dist = Math.abs(progress - i);

    const opacity = interpolate(dist, [0, 1], [1, 0.55], Extrapolation.CLAMP);
    const scale = interpolate(dist, [0, 1], [1, 0.98], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.Text
      style={[
        {
          fontSize: 13,
          fontWeight: active ? "700" : "600",
          color: "rgba(2, 6, 23, 0.92)",
        },
        textStyle,
      ]}
      numberOfLines={1}
    >
      {title}
    </Animated.Text>
  );
}
