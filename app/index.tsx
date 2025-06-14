import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Using Expo LinearGradient

export default function Home() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0); // Initial opacity for fade animation

  // Start the fade-in effect when the component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#2575FC", "#4E8DFF"]} style={styles.container}>
      {/* Ensure content is inside a ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require("../assets/images/logo512.png")} style={styles.logo} />
          <Text style={styles.title}>MedInventory Pro</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push("/signup")}>
            <Text style={styles.getStartedText}>Get Started 🚀</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>Revolutionizing Pharmacy Management</Text>
          <Text style={styles.subtext}>Transform your pharmacy operations with AI-powered inventory.</Text>
          <Text style={styles.features}>Real-time tracking • Automated alerts • Smart analytics</Text>
        </View>

        {/* Horizontal ScrollView for Features */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresContainer}>
          <View style={styles.card}>
            <Image source={require("../assets/images/2.jpeg")} style={styles.icon} />
            <Text style={styles.cardTitle}>Smart Inventory</Text>
            <Text style={styles.cardText}>AI-powered stock predictions & expiration tracking</Text>
          </View>
          <View style={styles.card}>
            <Image source={require("../assets/images/2.jpeg")} style={styles.icon} />
            <Text style={styles.cardTitle}>Medicine Tracking</Text>
            <Text style={styles.cardText}>Batch-level tracking with real-time updates</Text>
          </View>
          <View style={styles.card}>
            <Image source={require("../assets/images/2.jpeg")} style={styles.icon} />
            <Text style={styles.cardTitle}>Advanced Analytics</Text>
            <Text style={styles.cardText}>Interactive dashboards & sales insights</Text>
          </View>
        </ScrollView>

        {/* Static Cards Section with Animation */}
        <Animated.View style={[styles.staticCardContainer, { opacity: fadeAnim }]}>
          <View style={styles.staticCard}>
            <Text style={styles.staticCardTitle}>Instant Stock Alerts</Text>
            <Text style={styles.staticCardText}>
              Receive notifications whenever stock levels run low or items near expiry.
            </Text>
          </View>
          <View style={styles.staticCard}>
            <Text style={styles.staticCardTitle}>Automatic Restock Suggestions</Text>
            <Text style={styles.staticCardText}>
              Our AI suggests when to restock based on consumption trends.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  getStartedButton: {
    backgroundColor: "#E91E63",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  getStartedText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#E0E0E0",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
  },
  features: {
    fontSize: 15,
    color: "#FFC107",
    fontWeight: "bold",
    textAlign: "center",
  },
  featuresContainer: {
    marginTop: 25,
    height: 180, // Fixed height to prevent stretching
  },
  card: {
    backgroundColor: "white",
    padding: 15, // Reduced padding
    borderRadius: 15,
    width: 180, // Reduced width to fit smaller screens
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  icon: {
    width: 60, // Adjusted image size
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  staticCardContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  staticCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  staticCardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  staticCardText: {
    fontSize: 14,
    color: "gray",
  },
});
