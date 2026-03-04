import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedPromotionsSection from "../home/FeaturedPromotionsSection";
import HomeHeader from "../home/HomeHeader";
import HomeHeroCarousel from "../home/HomeHeroCarousel";
import PopularCountriesSection from "../home/PopularCountriesSection";
import RecentContactsList from "../home/RecentContactsList";
import ServicesGrid from "../home/ServicesGrid";
import SpecialOffersSection from "../home/SpecialOffersSection";

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
        {/* Example usage with navigation:
          <ServicesGrid onPressService={(key) => router.push(`/services/${key}`)} />
      */}
        {/* <Button
          title="Go to Promotions"
          onPress={() => router.push("/(modals)/country-picker")}
        /> */}
        <HomeHeroCarousel
          onPressSlide={(id) => {
            console.log("Slide pressed:", id);
          }}
        />

        <RecentContactsList />
        <ServicesGrid />
        {/* Example usage with navigation:
          <FeaturedPromotionsSection onPressPromotion={(id) => router.push(`/promotions/${id}`)} />
      */}
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
        {/* Example usage with navigation:
          <SpecialOffersSection onPressOffer={(id) => router.push(`/offers/${id}`)} />
      */}
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
