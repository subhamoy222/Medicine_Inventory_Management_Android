import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const cardData = [
  {
    title: "Purchase Bill",
    subtitle: "Record incoming stock",
    icon: "shopping",
    bgColor: "#008080",
    route: "/tabs/PurchaseBill", // Path based routing in Expo Router
  },
  {
    title: "Sell Bill",
    subtitle: "Track customer sales",
    icon: "cash-multiple",
    bgColor: "#1E90FF",
    route: "/tabs/SellScreen",
  },
  {
    title: "Return Bill",
    subtitle: "Manage product returns",
    icon: "undo-variant",
    bgColor: "#8A2BE2",
    route: "/tabs/ReturnScreen",
  },
  {
    title: "Expiry Bill",
    subtitle: "Handle expired stock",
    icon: "alert-circle",
    bgColor: "#DC143C",
    route: "/tabs/ExpiryScreen",
  },
];

const GenerateBill = () => {
  const router = useRouter(); // Expo Router hook for navigation

  return (
    <View style={styles.container}>
      {cardData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: item.bgColor }]}
          onPress={() => router.push(item.route)}
        >
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={30} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
});

export default GenerateBill;
