import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const InventoryScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://medicine-inventory-system.onrender.com/api/inventory/subhamoysasmal396@gmail.com");
      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch inventory: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data);
      setInventory(data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : inventory.length === 0 ? (
        <Text style={styles.emptyText}>No inventory found</Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.itemName || "Unnamed Item"}</Text>
              <Text style={styles.detail}>Batch: {item.batch || "N/A"}</Text>
              <Text style={styles.detail}>
                Expiry: {item.expiryDate ? new Date(item.expiryDate).toDateString() : "N/A"}
              </Text>
              <Text style={styles.detail}>Quantity: {item.quantity || 0}</Text>
              <Text style={styles.detail}>MRP: ₹{item.mrp || 0}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detail: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});

export default InventoryScreen;
