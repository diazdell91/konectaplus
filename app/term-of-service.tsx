import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function TermsOfServiceScreen() {
  return (
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing and using Inkigo (&quot;the Service&quot;), you accept
            and agree to be bound by the terms and provision of this agreement.
            If you do not agree to abide by the above, please do not use this
            service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.paragraph}>
            Inkigo is a virtual tattoo preview application that uses artificial
            intelligence to simulate how tattoo designs would appear on your
            body. The service includes:
          </Text>
          <Text style={styles.bulletPoint}>
            • AI-powered tattoo simulation technology
          </Text>
          <Text style={styles.bulletPoint}>
            • Virtual tattoo preview on uploaded photos
          </Text>
          <Text style={styles.bulletPoint}>
            • Access to tattoo design library
          </Text>
          <Text style={styles.bulletPoint}>
            • Custom design upload functionality
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            When using our service, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>
            • Provide accurate information when creating an account
          </Text>
          <Text style={styles.bulletPoint}>
            • Use the service only for lawful purposes
          </Text>
          <Text style={styles.bulletPoint}>
            • Not upload inappropriate, offensive, or copyrighted content
          </Text>
          <Text style={styles.bulletPoint}>
            • Respect intellectual property rights
          </Text>
          <Text style={styles.bulletPoint}>
            • Not attempt to reverse engineer or hack the service
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. Subscription Plans and Fair Usage Policy
          </Text>
          <Text style={styles.paragraph}>
            We offer various subscription plans, including plans marketed as
            &quot;unlimited&quot; designs and style generations. However, to
            ensure fair access and prevent abuse of our service:
          </Text>
          <Text style={styles.bulletPoint}>
            • Unlimited plans are subject to fair usage policies
          </Text>
          <Text style={styles.bulletPoint}>
            • We reserve the right to implement reasonable usage limits to
            prevent abuse
          </Text>
          <Text style={styles.bulletPoint}>
            • Excessive or abusive usage may result in temporary throttling or
            account review
          </Text>
          <Text style={styles.bulletPoint}>
            • Fair usage limits are designed to accommodate typical user needs
            while maintaining service quality for all users
          </Text>
          <Text style={styles.bulletPoint}>
            • We may modify subscription features and limits with reasonable
            notice
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. Content and Intellectual Property
          </Text>
          <Text style={styles.paragraph}>
            Regarding content and intellectual property:
          </Text>
          <Text style={styles.bulletPoint}>
            • You retain ownership of photos you upload
          </Text>
          <Text style={styles.bulletPoint}>
            • You grant us permission to process your images for tattoo
            simulation
          </Text>
          <Text style={styles.bulletPoint}>
            • Our tattoo designs and AI technology are protected by copyright
          </Text>
          <Text style={styles.bulletPoint}>
            • You may not redistribute or resell our content
          </Text>
          <Text style={styles.bulletPoint}>
            • Generated previews are for personal use only
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. Privacy and Data Protection
          </Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. Our collection and use of personal
            information is governed by our Privacy Policy. By using the service,
            you consent to the collection and use of information as outlined in
            our Privacy Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Disclaimer of Warranties</Text>
          <Text style={styles.paragraph}>
            The service is provided &quot;as is&quot; without warranties of any
            kind:
          </Text>
          <Text style={styles.bulletPoint}>
            • We do not guarantee the accuracy of tattoo previews
          </Text>
          <Text style={styles.bulletPoint}>
            • Actual tattoo results may vary significantly from previews
          </Text>
          <Text style={styles.bulletPoint}>
            • The service may have technical limitations or interruptions
          </Text>
          <Text style={styles.bulletPoint}>
            • We recommend consulting with professional tattoo artists
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            To the fullest extent permitted by law:
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not liable for any indirect, incidental, or consequential
            damages
          </Text>
          <Text style={styles.bulletPoint}>
            • Our total liability shall not exceed the amount paid for the
            service
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not responsible for tattoo decisions based on our previews
          </Text>
          <Text style={styles.bulletPoint}>
            • Users assume full responsibility for their tattoo choices
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            9. Medical and Safety Disclaimer
          </Text>
          <Text style={styles.paragraph}>
            Important medical and safety information:
          </Text>
          <Text style={styles.bulletPoint}>
            • Our service is for visualization purposes only
          </Text>
          <Text style={styles.bulletPoint}>
            • Always consult with licensed tattoo professionals
          </Text>
          <Text style={styles.bulletPoint}>
            • Consider skin type, allergies, and medical conditions
          </Text>
          <Text style={styles.bulletPoint}>
            • We are not medical professionals and provide no medical advice
          </Text>
          <Text style={styles.bulletPoint}>
            • Tattoos are permanent and carry inherent risks
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            10. AI Service and Third-Party Technologies
          </Text>
          <Text style={styles.paragraph}>
            Our service utilizes Google Gemini AI technology and other
            third-party services to provide tattoo simulation features. By using
            our service, you acknowledge and agree that:
          </Text>
          <Text style={styles.bulletPoint}>
            • Your images may be processed by Google AI services
          </Text>
          <Text style={styles.bulletPoint}>
            • You must comply with Google Generative AI Prohibited Use Policy
          </Text>
          <Text style={styles.bulletPoint}>
            • AI-generated previews are simulations and may not be perfectly
            accurate
          </Text>
          <Text style={styles.bulletPoint}>
            • We may update or change AI providers without prior notice
          </Text>
          <Text style={styles.bulletPoint}>
            • Third-party service availability may affect our functionality
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            11. Prohibited Uses and Content Restrictions
          </Text>
          <Text style={styles.paragraph}>
            In accordance with our AI service providers policies and applicable
            laws, you may not use the service for any of the following
            prohibited activities:
          </Text>

          <Text style={styles.subSectionTitle}>General Prohibited Uses:</Text>
          <Text style={styles.bulletPoint}>
            • Any unlawful purpose or activity
          </Text>
          <Text style={styles.bulletPoint}>
            • Violating any intellectual property rights
          </Text>
          <Text style={styles.bulletPoint}>
            • Transmitting viruses or malicious code
          </Text>
          <Text style={styles.bulletPoint}>
            • Commercial use without authorization
          </Text>
          <Text style={styles.bulletPoint}>
            • Circumventing our safety filters or abuse protections
          </Text>

          <Text style={styles.subSectionTitle}>
            Content Restrictions - You may not upload or generate:
          </Text>
          <Text style={styles.bulletPoint}>
            • Content relating to child sexual abuse or exploitation
          </Text>
          <Text style={styles.bulletPoint}>
            • Content that facilitates violent extremism or terrorism
          </Text>
          <Text style={styles.bulletPoint}>
            • Non-consensual intimate imagery
          </Text>
          <Text style={styles.bulletPoint}>
            • Content that facilitates self-harm
          </Text>
          <Text style={styles.bulletPoint}>
            • Sexually explicit content created for pornography or sexual
            gratification
          </Text>
          <Text style={styles.bulletPoint}>
            • Content promoting hatred, harassment, bullying, or violence
          </Text>
          <Text style={styles.bulletPoint}>
            • Content that violates others privacy rights or uses personal data
            without consent
          </Text>
          <Text style={styles.bulletPoint}>
            • Content intended for fraud, scams, or deceptive practices
          </Text>
          <Text style={styles.bulletPoint}>
            • Content that impersonates individuals to deceive others
          </Text>
          <Text style={styles.bulletPoint}>
            • Spam, phishing, or malware-related content
          </Text>

          <Text style={styles.subSectionTitle}>
            Age and Safety Restrictions:
          </Text>
          <Text style={styles.bulletPoint}>
            • Images of minors (under 18) without verifiable parental consent
          </Text>
          <Text style={styles.bulletPoint}>
            • Content that could facilitate harm to minors
          </Text>
          <Text style={styles.bulletPoint}>
            • Images that track or monitor people without their consent
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            12. AI-Generated Content Disclaimer
          </Text>
          <Text style={styles.paragraph}>
            Important disclaimers regarding AI-generated content:
          </Text>
          <Text style={styles.bulletPoint}>
            • All tattoo previews are AI-generated simulations, not medical or
            professional advice
          </Text>
          <Text style={styles.bulletPoint}>
            • AI results may contain inaccuracies, artifacts, or unexpected
            variations
          </Text>
          <Text style={styles.bulletPoint}>
            • Generated content should not be considered as human-created
            artwork
          </Text>
          <Text style={styles.bulletPoint}>
            • We cannot guarantee the accuracy, completeness, or suitability of
            AI outputs
          </Text>
          <Text style={styles.bulletPoint}>
            • Users should verify all results and consult professionals before
            making decisions
          </Text>
          <Text style={styles.bulletPoint}>
            • AI processing is subject to the terms and limitations of our
            third-party providers
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            13. Content Monitoring and Enforcement
          </Text>
          <Text style={styles.paragraph}>
            To ensure compliance with these terms and our AI providers policies:
          </Text>
          <Text style={styles.bulletPoint}>
            • We may monitor uploaded content using automated systems
          </Text>
          <Text style={styles.bulletPoint}>
            • Prohibited content will be automatically rejected or removed
          </Text>
          <Text style={styles.bulletPoint}>
            • Repeated violations may result in account suspension or
            termination
          </Text>
          <Text style={styles.bulletPoint}>
            • We reserve the right to refuse service to users who violate
            policies
          </Text>
          <Text style={styles.bulletPoint}>
            • Appeals for content decisions can be submitted through our support
            channels
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Account Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate or suspend accounts that violate
            these terms, including violations of AI service provider policies.
            You may also terminate your account at any time by contacting us or
            using the account deletion feature in the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>15. Age Restrictions</Text>
          <Text style={styles.paragraph}>
            Users must be at least 13 years old to use this service. Users under
            18 should have parental supervision and consent before making any
            tattoo-related decisions. Always check local laws regarding tattoo
            age restrictions. We do not knowingly process images of minors
            without proper consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>16. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right to modify these terms at any time, including
            changes required by our AI service providers or applicable law.
            Users will be notified of significant changes, and continued use of
            the service constitutes acceptance of modified terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>17. Governing Law</Text>
          <Text style={styles.paragraph}>
            These terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>18. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms of Service, please
            contact us at:
          </Text>
          <Text style={styles.contactInfo}>Email: beto@codewithbeto.dev</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
    fontSize: width > 768 ? 36 : 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#cccccc",
    textAlign: "center",
    marginBottom: 32,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    marginBottom: 4,
    marginLeft: 16,
  },
  contactInfo: {
    fontSize: 16,
    color: "#007AFF",
    lineHeight: 24,
    marginBottom: 4,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 16,
    marginBottom: 8,
  },
});
