import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const API_URL = "https://medicine-inventory-system.onrender.com/api/inventory/subhamoysasmal49@gmail.com"; // Change if needed

export default function HomeScreen() {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching inventory from:", API_URL);
      const response = await fetch(API_URL);

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch inventory: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched inventory data:", JSON.stringify(data, null, 2));
      setInventory(data);
    } catch (err) {
      console.error("Error fetching inventory:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.email}>subhamoysasmal49@gmail.com!</Text>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            {inventory ? `${inventory.alerts} Alerts` : "0 Alerts"}
          </Text>
        </View>
      </View>

      {/* Inventory Health Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="pill" size={24} color="#ff4757" />
          <Text style={styles.cardTitle}>Inventory Health</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : error ? (
          <Text style={styles.errorText}>⚠️ {error}</Text>
        ) : inventory ? (
          <>
            <View style={styles.item}>
              <Icon name="package-variant" size={24} color="#3498db" />
              <Text style={styles.itemText}>Total Medicines</Text>
              <Text style={styles.itemCount}>{inventory.totalMedicines}</Text>
            </View>

            <View style={styles.item}>
              <Icon name="alert-circle-outline" size={24} color="#f39c12" />
              <Text style={styles.itemText}>Low Stock</Text>
              <Text style={styles.itemCount}>{inventory.lowStock}</Text>
            </View>

            <View style={styles.item}>
              <Icon name="timer-sand" size={24} color="#e74c3c" />
              <Text style={styles.itemText}>Expiring Soon</Text>
              <Text style={styles.itemCount}>{inventory.expiringSoon}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>

      {/* Retry Button */}
      <TouchableOpacity style={styles.checkInventoryButton} onPress={fetchInventory}>
        <Text style={styles.buttonText}>🔄 Retry Fetch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    backgroundColor: "#e3f2fd",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  email: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  alertBox: {
    backgroundColor: "#d1f2eb",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  alertText: {
    color: "#16a085",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#2c3e50",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 10,
  },
  noDataText: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
  },
  checkInventoryButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
