import { useQuery } from "@apollo/client/react";
import { Image } from "expo-image";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import {
  HERO_BANNERS,
  HeroBanner,
  HeroBannersData,
} from "@/graphql/heroBanners";
import { COLORS, FONT_FAMILIES } from "@/theme";

const SLIDE_MARGIN = 16;
const SLIDE_GAP = 12;

interface HomeHeroCarouselProps {
  onPressSlide?: (banner: HeroBanner) => void;
}

const HomeHeroCarousel = ({ onPressSlide }: HomeHeroCarouselProps) => {
  const { width } = useWindowDimensions();
  const slideWidth = width - SLIDE_MARGIN * 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const { data, loading } = useQuery<HeroBannersData>(HERO_BANNERS);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const handlePress = (banner: HeroBanner) => {
    if (onPressSlide) {
      onPressSlide(banner);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator color={COLORS.primary.main} />
      </View>
    );
  }

  const banners = data?.heroBanners ?? [];

  if (banners.length === 0) return null;

  const renderItem = ({ item }: { item: HeroBanner }) => (
    <Pressable
      style={[styles.slide, { width: slideWidth }]}
      onPress={() => handlePress(item)}
    >
      {/* Left content */}
      <View style={styles.slideLeft}>
        <Text style={styles.slideTitle} numberOfLines={3}>
          {item.title}
        </Text>
        {item.subtitle ? (
          <Pressable
            style={styles.button}
            onPress={() => handlePress(item)}
            hitSlop={8}
          >
            <Text style={styles.buttonText}>{item.subtitle}</Text>
          </Pressable>
        ) : null}
      </View>

      {/* Right image */}
      {item.imageUrl ? (
        <View style={styles.slideRight}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.slideImage}
            contentFit="contain"
          />
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={slideWidth + SLIDE_GAP}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
      />

      {/* Dots */}
      {banners.length > 1 && (
        <View style={styles.dotsRow}>
          {banners.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeHeroCarousel;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  loadingContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: SLIDE_MARGIN,
    gap: SLIDE_GAP,
  },
  slide: {
    backgroundColor: COLORS.primary.main,
    borderRadius: 30,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    minHeight: 180,
  },
  slideLeft: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    paddingRight: 8,
  },
  slideTitle: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 30,
  },
  button: {
    backgroundColor: "#FACC15",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  slideRight: {
    width: 130,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: 130,
    height: 150,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
  },
  dotActive: {
    backgroundColor: COLORS.primary.main,
    width: 20,
    borderRadius: 4,
  },
});
