import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedPromotionsSection from "../components/FeaturedPromotionsSection";
import HomeHeader from "../components/HomeHeader";
import HomeHeroCarousel from "../components/HomeHeroCarousel";
import PopularCountriesSection from "../components/PopularCountriesSection";
import RecentContactsList from "../components/RecentContactsList";
import ServicesGrid from "../components/ServicesGrid";
import SpecialOffersSection from "../components/SpecialOffersSection";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.stickyHeader}>
          <HomeHeader />
        </View>

        <HomeHeroCarousel
          onPressSlide={(banner) => {
            console.log(
              "Slide pressed:",
              banner.id,
              banner.actionType,
              banner.actionValue,
            );
          }}
        />

        <RecentContactsList />
        <ServicesGrid />

        <FeaturedPromotionsSection
          onPressPromotion={(id) => {
            console.log("Promotion selected:", id);
          }}
        />
        <PopularCountriesSection
          onPressCountry={(id) => {
            console.log("Country pressed:", id);
          }}
        />

        <SpecialOffersSection
          onPressOffer={(id) => {
            console.log("Offer selected:", id);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  stickyHeader: {
    backgroundColor: "transparent",
    zIndex: 10,
  },
});
