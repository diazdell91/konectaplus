import React, { useCallback, useMemo } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
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

const { width: SCREEN_W } = Dimensions.get("window");

export default function SegmentedTopTabsPager({
  tabs,
  index,
  onIndexChange,
  renderPage,
  height,
}: Props) {
  const pageX = useSharedValue(-index * SCREEN_W);

  // Mantén pageX sincronizado cuando cambie index desde afuera
  React.useEffect(() => {
    pageX.value = withSpring(-index * SCREEN_W, {
      damping: 20,
      stiffness: 220,
    });
  }, [index, pageX]);

  const snapTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(tabs.length - 1, nextIndex));
      onIndexChange(clamped);
    },
    [onIndexChange, tabs.length],
  );

  const pan = useMemo(() => {
    let startX = 0;

    return Gesture.Pan()
      .onBegin(() => {
        startX = pageX.value;
      })
      .onUpdate((e) => {
        const next = startX + e.translationX;

        // clamp (no overscroll)
        const minX = -(tabs.length - 1) * SCREEN_W;
        const maxX = 0;
        pageX.value = Math.max(minX, Math.min(maxX, next));
      })
      .onEnd((e) => {
        // decidir a qué página ir
        const raw = -pageX.value / SCREEN_W;

        // “flick” support
        const velocityBoost = e.velocityX * -0.0006; // ajustable
        const target = Math.round(raw + velocityBoost);

        const clamped = Math.max(0, Math.min(tabs.length - 1, target));
        pageX.value = withSpring(-clamped * SCREEN_W, {
          damping: 20,
          stiffness: 220,
        });
        runOnJS(snapTo)(clamped);
      });
  }, [pageX, snapTo, tabs.length]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pageX.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <SegmentedHeader
        tabs={tabs}
        index={index}
        pageX={pageX}
        onPressTab={(i) => {
          pageX.value = withSpring(-i * SCREEN_W, {
            damping: 20,
            stiffness: 220,
          });
          onIndexChange(i);
        }}
      />

      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, overflow: "hidden" }}>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: SCREEN_W * tabs.length,
                height: height ?? "100%",
              },
              containerStyle,
            ]}
          >
            {tabs.map((t) => (
              <View key={t.key} style={{ width: SCREEN_W, flex: 1 }}>
                {renderPage(t.key)}
              </View>
            ))}
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
}: {
  tabs: { key: string; title: string }[];
  index: number;
  pageX: SharedValue<number>;
  onPressTab: (i: number) => void;
}) {
  const segmentW = (SCREEN_W - 32) / tabs.length; // 16 padding each side
  const indicatorStyle = useAnimatedStyle(() => {
    const progress = -pageX.value / SCREEN_W; // 0..N
    return {
      transform: [{ translateX: progress * segmentW }],
    };
  });

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 }}>
      <View
        style={{
          height: 44,
          borderRadius: 14,
          backgroundColor: "rgba(2, 6, 23, 0.06)",
          padding: 4,
          flexDirection: "row",
          position: "relative",
        }}
      >
        {/* indicador */}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 4,
              top: 4,
              width: segmentW - 0,
              height: 36,
              borderRadius: 12,
              backgroundColor: "white",
              // sombra suave
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            },
            indicatorStyle,
          ]}
        />

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
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function TabLabel({
  title,
  active,
  pageX,
  i,
}: {
  title: string;
  active: boolean;
  pageX: SharedValue<number>;
  i: number;
}) {
  const textStyle = useAnimatedStyle(() => {
    const progress = -pageX.value / SCREEN_W; // 0..N
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
