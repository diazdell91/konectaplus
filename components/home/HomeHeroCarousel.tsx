import { Image } from "expo-image";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import { FONT_FAMILIES } from "@/theme/typography";

const SLIDE_MARGIN = 16;
const SLIDE_GAP = 12;

interface Slide {
  id: string;
  title: string;
  buttonText: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: "1",
    title: "¡No te quedes sin conexión! Recarga a cualquier parte del mundo.",
    buttonText: "Recargar",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Envía saldo rápido y seguro a tu familia.",
    buttonText: "Enviar ahora",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Las mejores promociones internacionales.",
    buttonText: "Ver ofertas",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&h=600&fit=crop",
  },
];

interface HomeHeroCarouselProps {
  onPressSlide?: (slideId: string) => void;
}

const HomeHeroCarousel = ({ onPressSlide }: HomeHeroCarouselProps) => {
  const { width } = useWindowDimensions();
  const slideWidth = width - SLIDE_MARGIN * 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const handlePress = (id: string) => {
    if (onPressSlide) {
      onPressSlide(id);
    } else {
      console.log(id);
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <Pressable
      style={[styles.slide, { width: slideWidth }]}
      onPress={() => handlePress(item.id)}
    >
      {/* Left content */}
      <View style={styles.slideLeft}>
        <Text style={styles.slideTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => handlePress(item.id)}
          hitSlop={8}
        >
          <Text style={styles.buttonText}>{item.buttonText}</Text>
        </Pressable>
      </View>

      {/* Right image */}
      <View style={styles.slideRight}>
        <Image
          source={{ uri: item.image }}
          style={styles.slideImage}
          contentFit="contain"
        />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
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
      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeHeroCarousel;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  flatListContent: {
    paddingHorizontal: SLIDE_MARGIN,
    gap: SLIDE_GAP,
  },
  slide: {
    backgroundColor: "#3B82F6",
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
    backgroundColor: "#3B82F6",
    width: 20,
    borderRadius: 4,
  },
});
