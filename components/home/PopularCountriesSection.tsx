import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FONT_FAMILIES } from "@/theme/typography";

const HORIZONTAL_PADDING = 16;
const NUM_COLUMNS = 4;

interface Country {
  id: string;
  name: string;
  image: string;
}

const countries: Country[] = [
  {
    id: "1",
    name: "México",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Nicaragua",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Cuba",
    image: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "RD",
    image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "El Salvador",
    image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "Haití",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&h=200&fit=crop",
  },
  {
    id: "7",
    name: "Honduras",
    image: "https://images.unsplash.com/photo-1591012911207-0dbac5c92cad?w=200&h=200&fit=crop",
  },
  {
    id: "8",
    name: "Guatemala",
    image: "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=200&h=200&fit=crop",
  },
];

interface PopularCountriesSectionProps {
  onPressCountry?: (countryId: string) => void;
}

const PopularCountriesSection = ({
  onPressCountry,
}: PopularCountriesSectionProps) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - HORIZONTAL_PADDING * 2) / NUM_COLUMNS;
  const imageSize = Math.min(itemWidth * 0.72, 76);

  const handlePress = (id: string) => {
    if (onPressCountry) {
      onPressCountry(id);
    } else {
      console.log(id);
    }
  };

  const renderItem = ({ item }: { item: Country }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        { width: itemWidth },
        pressed && styles.itemPressed,
      ]}
      onPress={() => handlePress(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          styles.image,
          {
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          },
        ]}
        contentFit="cover"
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Países populares</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      />
    </View>
  );
};

export default PopularCountriesSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 22,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 16,
  },
  item: {
    alignItems: "center",
    paddingVertical: 4,
  },
  itemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  image: {
    backgroundColor: "#F0F2F5",
  },
  name: {
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 13,
    fontWeight: "500",
    color: "#111111",
    textAlign: "center",
    marginTop: 8,
  },
  rowSeparator: {
    height: 12,
  },
});
