import { COLORS } from "@/theme/colors";
import { FONT_FAMILIES } from "@/theme/typography";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LegalBulletPoint from "../components/LegalBulletPoint";
import LegalParagraph from "../components/LegalParagraph";
import LegalSection from "../components/LegalSection";
import LegalSubSectionTitle from "../components/LegalSubSectionTitle";

const TermsOfServiceScreen = () => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
    contentInsetAdjustmentBehavior="automatic"
  >
    <View style={styles.content}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.lastUpdated}>
        Last updated: {new Date().toLocaleDateString()}
      </Text>

      <LegalSection title="1. Acceptance of Terms">
        <LegalParagraph>
          By accessing and using Inkigo ("the Service"), you accept and agree to
          be bound by the terms and provision of this agreement. If you do not
          agree to abide by the above, please do not use this service.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Description of Service">
        <LegalParagraph>
          Inkigo is a virtual tattoo preview application that uses artificial
          intelligence to simulate how tattoo designs would appear on your body.
          The service includes:
        </LegalParagraph>
        <LegalBulletPoint>AI-powered tattoo simulation technology</LegalBulletPoint>
        <LegalBulletPoint>Virtual tattoo preview on uploaded photos</LegalBulletPoint>
        <LegalBulletPoint>Access to tattoo design library</LegalBulletPoint>
        <LegalBulletPoint>Custom design upload functionality</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="3. User Responsibilities">
        <LegalParagraph>When using our service, you agree to:</LegalParagraph>
        <LegalBulletPoint>Provide accurate information when creating an account</LegalBulletPoint>
        <LegalBulletPoint>Use the service only for lawful purposes</LegalBulletPoint>
        <LegalBulletPoint>Not upload inappropriate, offensive, or copyrighted content</LegalBulletPoint>
        <LegalBulletPoint>Respect intellectual property rights</LegalBulletPoint>
        <LegalBulletPoint>Not attempt to reverse engineer or hack the service</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="4. Subscription Plans and Fair Usage Policy">
        <LegalParagraph>
          We offer various subscription plans, including plans marketed as
          "unlimited" designs and style generations. However, to ensure fair
          access and prevent abuse of our service:
        </LegalParagraph>
        <LegalBulletPoint>Unlimited plans are subject to fair usage policies</LegalBulletPoint>
        <LegalBulletPoint>
          We reserve the right to implement reasonable usage limits to prevent abuse
        </LegalBulletPoint>
        <LegalBulletPoint>
          Excessive or abusive usage may result in temporary throttling or account review
        </LegalBulletPoint>
        <LegalBulletPoint>
          Fair usage limits are designed to accommodate typical user needs while maintaining
          service quality for all users
        </LegalBulletPoint>
        <LegalBulletPoint>
          We may modify subscription features and limits with reasonable notice
        </LegalBulletPoint>
      </LegalSection>

      <LegalSection title="5. Content and Intellectual Property">
        <LegalParagraph>Regarding content and intellectual property:</LegalParagraph>
        <LegalBulletPoint>You retain ownership of photos you upload</LegalBulletPoint>
        <LegalBulletPoint>
          You grant us permission to process your images for tattoo simulation
        </LegalBulletPoint>
        <LegalBulletPoint>
          Our tattoo designs and AI technology are protected by copyright
        </LegalBulletPoint>
        <LegalBulletPoint>You may not redistribute or resell our content</LegalBulletPoint>
        <LegalBulletPoint>Generated previews are for personal use only</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="6. Privacy and Data Protection">
        <LegalParagraph>
          Your privacy is important to us. Our collection and use of personal
          information is governed by our Privacy Policy. By using the service,
          you consent to the collection and use of information as outlined in
          our Privacy Policy.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Disclaimer of Warranties">
        <LegalParagraph>
          The service is provided "as is" without warranties of any kind:
        </LegalParagraph>
        <LegalBulletPoint>We do not guarantee the accuracy of tattoo previews</LegalBulletPoint>
        <LegalBulletPoint>
          Actual tattoo results may vary significantly from previews
        </LegalBulletPoint>
        <LegalBulletPoint>
          The service may have technical limitations or interruptions
        </LegalBulletPoint>
        <LegalBulletPoint>We recommend consulting with professional tattoo artists</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <LegalParagraph>To the fullest extent permitted by law:</LegalParagraph>
        <LegalBulletPoint>
          We are not liable for any indirect, incidental, or consequential damages
        </LegalBulletPoint>
        <LegalBulletPoint>
          Our total liability shall not exceed the amount paid for the service
        </LegalBulletPoint>
        <LegalBulletPoint>
          We are not responsible for tattoo decisions based on our previews
        </LegalBulletPoint>
        <LegalBulletPoint>Users assume full responsibility for their tattoo choices</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="9. Medical and Safety Disclaimer">
        <LegalParagraph>Important medical and safety information:</LegalParagraph>
        <LegalBulletPoint>Our service is for visualization purposes only</LegalBulletPoint>
        <LegalBulletPoint>Always consult with licensed tattoo professionals</LegalBulletPoint>
        <LegalBulletPoint>Consider skin type, allergies, and medical conditions</LegalBulletPoint>
        <LegalBulletPoint>
          We are not medical professionals and provide no medical advice
        </LegalBulletPoint>
        <LegalBulletPoint>Tattoos are permanent and carry inherent risks</LegalBulletPoint>
      </LegalSection>

      <LegalSection title="10. AI Service and Third-Party Technologies">
        <LegalParagraph>
          Our service utilizes Google Gemini AI technology and other third-party
          services to provide tattoo simulation features. By using our service,
          you acknowledge and agree that:
        </LegalParagraph>
        <LegalBulletPoint>Your images may be processed by Google AI services</LegalBulletPoint>
        <LegalBulletPoint>
          You must comply with Google Generative AI Prohibited Use Policy
        </LegalBulletPoint>
        <LegalBulletPoint>
          AI-generated previews are simulations and may not be perfectly accurate
        </LegalBulletPoint>
        <LegalBulletPoint>
          We may update or change AI providers without prior notice
        </LegalBulletPoint>
        <LegalBulletPoint>
          Third-party service availability may affect our functionality
        </LegalBulletPoint>
      </LegalSection>

      <LegalSection title="11. Prohibited Uses and Content Restrictions">
        <LegalParagraph>
          In accordance with our AI service providers policies and applicable
          laws, you may not use the service for any of the following prohibited
          activities:
        </LegalParagraph>

        <LegalSubSectionTitle>General Prohibited Uses:</LegalSubSectionTitle>
        <LegalBulletPoint>Any unlawful purpose or activity</LegalBulletPoint>
        <LegalBulletPoint>Violating any intellectual property rights</LegalBulletPoint>
        <LegalBulletPoint>Transmitting viruses or malicious code</LegalBulletPoint>
        <LegalBulletPoint>Commercial use without authorization</LegalBulletPoint>
        <LegalBulletPoint>Circumventing our safety filters or abuse protections</LegalBulletPoint>

        <LegalSubSectionTitle>
          Content Restrictions - You may not upload or generate:
        </LegalSubSectionTitle>
        <LegalBulletPoint>
          Content relating to child sexual abuse or exploitation
        </LegalBulletPoint>
        <LegalBulletPoint>
          Content that facilitates violent extremism or terrorism
        </LegalBulletPoint>
        <LegalBulletPoint>Non-consensual intimate imagery</LegalBulletPoint>
        <LegalBulletPoint>Content that facilitates self-harm</LegalBulletPoint>
        <LegalBulletPoint>
          Sexually explicit content created for pornography or sexual gratification
        </LegalBulletPoint>
        <LegalBulletPoint>
          Content promoting hatred, harassment, bullying, or violence
        </LegalBulletPoint>
        <LegalBulletPoint>
          Content that violates others privacy rights or uses personal data without consent
        </LegalBulletPoint>
        <LegalBulletPoint>
          Content intended for fraud, scams, or deceptive practices
        </LegalBulletPoint>
        <LegalBulletPoint>
          Content that impersonates individuals to deceive others
        </LegalBulletPoint>
        <LegalBulletPoint>Spam, phishing, or malware-related content</LegalBulletPoint>

        <LegalSubSectionTitle>Age and Safety Restrictions:</LegalSubSectionTitle>
        <LegalBulletPoint>
          Images of minors (under 18) without verifiable parental consent
        </LegalBulletPoint>
        <LegalBulletPoint>Content that could facilitate harm to minors</LegalBulletPoint>
        <LegalBulletPoint>
          Images that track or monitor people without their consent
        </LegalBulletPoint>
      </LegalSection>

      <LegalSection title="12. AI-Generated Content Disclaimer">
        <LegalParagraph>
          Important disclaimers regarding AI-generated content:
        </LegalParagraph>
        <LegalBulletPoint>
          All tattoo previews are AI-generated simulations, not medical or professional advice
        </LegalBulletPoint>
        <LegalBulletPoint>
          AI results may contain inaccuracies, artifacts, or unexpected variations
        </LegalBulletPoint>
        <LegalBulletPoint>
          Generated content should not be considered as human-created artwork
        </LegalBulletPoint>
        <LegalBulletPoint>
          We cannot guarantee the accuracy, completeness, or suitability of AI outputs
        </LegalBulletPoint>
        <LegalBulletPoint>
          Users should verify all results and consult professionals before making decisions
        </LegalBulletPoint>
        <LegalBulletPoint>
          AI processing is subject to the terms and limitations of our third-party providers
        </LegalBulletPoint>
      </LegalSection>

      <LegalSection title="13. Content Monitoring and Enforcement">
        <LegalParagraph>
          To ensure compliance with these terms and our AI providers policies:
        </LegalParagraph>
        <LegalBulletPoint>
          We may monitor uploaded content using automated systems
        </LegalBulletPoint>
        <LegalBulletPoint>
          Prohibited content will be automatically rejected or removed
        </LegalBulletPoint>
        <LegalBulletPoint>
          Repeated violations may result in account suspension or termination
        </LegalBulletPoint>
        <LegalBulletPoint>
          We reserve the right to refuse service to users who violate policies
        </LegalBulletPoint>
        <LegalBulletPoint>
          Appeals for content decisions can be submitted through our support channels
        </LegalBulletPoint>
      </LegalSection>

      <LegalSection title="14. Account Termination">
        <LegalParagraph>
          We reserve the right to terminate or suspend accounts that violate these
          terms, including violations of AI service provider policies. You may also
          terminate your account at any time by contacting us or using the account
          deletion feature in the app.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="15. Age Restrictions">
        <LegalParagraph>
          Users must be at least 13 years old to use this service. Users under 18
          should have parental supervision and consent before making any
          tattoo-related decisions. Always check local laws regarding tattoo age
          restrictions. We do not knowingly process images of minors without proper
          consent.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="16. Changes to Terms">
        <LegalParagraph>
          We reserve the right to modify these terms at any time, including changes
          required by our AI service providers or applicable law. Users will be
          notified of significant changes, and continued use of the service
          constitutes acceptance of modified terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="17. Governing Law">
        <LegalParagraph>
          These terms shall be governed by and construed in accordance with the
          laws of [Your Jurisdiction], without regard to its conflict of law
          provisions.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="18. Contact Information">
        <LegalParagraph>
          If you have any questions about these Terms of Service, please contact
          us at:
        </LegalParagraph>
        <Text style={styles.contactInfo}>Email: beto@codewithbeto.dev</Text>
      </LegalSection>
    </View>
  </ScrollView>
);

export default TermsOfServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  title: {
    fontFamily: FONT_FAMILIES.bold,
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  lastUpdated: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginBottom: 32,
    fontStyle: "italic",
  },
  contactInfo: {
    fontFamily: FONT_FAMILIES.regular,
    fontSize: 16,
    color: COLORS.primary.main,
    lineHeight: 24,
    marginBottom: 4,
  },
});
