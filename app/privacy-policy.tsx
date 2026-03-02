import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            When you use Inkigo, we may collect the following information:
          </Text>
          <Text style={styles.bulletPoint}>
            • Photos you upload for tattoo preview
          </Text>
          <Text style={styles.bulletPoint}>
            • Device information and usage analytics
          </Text>
          <Text style={styles.bulletPoint}>
            • Account information if you create an account
          </Text>
          <Text style={styles.bulletPoint}>• Preferences and settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <Text style={styles.paragraph}>We use your information to:</Text>
          <Text style={styles.bulletPoint}>
            • Provide AI-powered tattoo preview services
          </Text>
          <Text style={styles.bulletPoint}>
            • Improve our app functionality and user experience
          </Text>
          <Text style={styles.bulletPoint}>
            • Process and analyze uploaded images for tattoo simulation
          </Text>
          <Text style={styles.bulletPoint}>
            • Send important updates about our services
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. AI Processing and Third-Party Services
          </Text>
          <Text style={styles.paragraph}>
            Our service uses Google Gemini AI and other third-party AI
            technologies to process your images and create tattoo previews.
            Important information about AI processing:
          </Text>
          <Text style={styles.bulletPoint}>
            • Your images may be processed by Google AI services in accordance
            with Google privacy policies
          </Text>
          <Text style={styles.bulletPoint}>
            • AI processing occurs on secure servers with encryption
          </Text>
          <Text style={styles.bulletPoint}>
            • We implement content filtering to prevent processing of prohibited
            content
          </Text>
          <Text style={styles.bulletPoint}>
            • AI processing is subject to the terms and privacy policies of our
            third-party providers
          </Text>
          <Text style={styles.bulletPoint}>
            • We may use anonymized, aggregated data to improve our AI models
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4. Image Processing and Storage
          </Text>
          <Text style={styles.paragraph}>
            Your uploaded photos are processed using AI technology to create
            realistic tattoo previews. We take your privacy seriously:
          </Text>
          <Text style={styles.bulletPoint}>
            • Images are processed securely and encrypted
          </Text>
          <Text style={styles.bulletPoint}>
            • We do not share your personal photos with unauthorized third
            parties
          </Text>
          <Text style={styles.bulletPoint}>
            • You can delete your images at any time
          </Text>
          <Text style={styles.bulletPoint}>
            • Images are automatically deleted after 30 days unless saved by you
          </Text>
          <Text style={styles.bulletPoint}>
            • We may retain metadata for security and abuse prevention purposes
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. Data Sharing and Disclosure
          </Text>
          <Text style={styles.paragraph}>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties, except:
          </Text>
          <Text style={styles.bulletPoint}>
            • When required by law or legal process
          </Text>
          <Text style={styles.bulletPoint}>
            • To protect our rights, property, or safety
          </Text>
          <Text style={styles.bulletPoint}>
            • With AI service providers (like Google) who process your images
            under strict confidentiality and security agreements
          </Text>
          <Text style={styles.bulletPoint}>
            • With other service providers who help operate our app (under
            strict confidentiality agreements)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement appropriate security measures to protect your
            information:
          </Text>
          <Text style={styles.bulletPoint}>
            • End-to-end encryption for image uploads
          </Text>
          <Text style={styles.bulletPoint}>
            • Secure servers with regular security updates
          </Text>
          <Text style={styles.bulletPoint}>
            • Access controls and authentication measures
          </Text>
          <Text style={styles.bulletPoint}>
            • Regular security audits and monitoring
          </Text>
          <Text style={styles.bulletPoint}>
            • Compliance with third-party AI provider security standards
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Your Rights</Text>
          <Text style={styles.paragraph}>You have the right to:</Text>
          <Text style={styles.bulletPoint}>
            • Access your personal information
          </Text>
          <Text style={styles.bulletPoint}>
            • Correct or update your information
          </Text>
          <Text style={styles.bulletPoint}>
            • Delete your account and associated data
          </Text>
          <Text style={styles.bulletPoint}>• Opt-out of communications</Text>
          <Text style={styles.bulletPoint}>• Request data portability</Text>
          <Text style={styles.bulletPoint}>
            • Request information about AI processing of your data
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Cookies and Analytics</Text>
          <Text style={styles.paragraph}>
            We use cookies and similar technologies to improve your experience
            and analyze app usage. You can control cookie settings through your
            browser or device settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Children&apos;s Privacy</Text>
          <Text style={styles.paragraph}>
            Our service is not intended for children under 13. We do not
            knowingly collect personal information from children under 13. We
            also do not knowingly process images of minors without proper
            parental consent. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us
            immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. International Users</Text>
          <Text style={styles.paragraph}>
            If you are accessing our service from outside the United States,
            please be aware that your information may be transferred to, stored,
            and processed in the United States and other countries where our
            servers and AI service providers are located. This includes
            processing by Google AI services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            11. Changes to This Privacy Policy
          </Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time, including
            changes required by our AI service providers or applicable law. We
            will notify you of any changes by posting the new Privacy Policy on
            this page and updating the &quot;Last updated&quot; date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
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
});
