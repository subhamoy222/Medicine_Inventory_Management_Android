import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function SellBillScreen() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  // Add item to the list
  const addItem = () => {
    if (!itemName || !quantity || !price) return alert("All fields are required!");

    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      total: parseInt(quantity) * parseFloat(price),
    };

    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
    setPrice("");
  };

  // Calculate total bill amount
  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sell Bill</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Item"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Add Item Button */}
      <Button title="Add Item" onPress={addItem} />

      {/* Display List of Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.quantity} x ₹{item.price}</Text>
            <Text>Total: ₹{item.total}</Text>
          </View>
        )}
      />

      {/* Total Amount */}
      <Text style={styles.total}>Total Bill: ₹{totalAmount.toFixed(2)}</Text>

      {/* Generate Bill Button */}
      <Button title="Generate Bill" onPress={() => alert(`Total Amount: ₹${totalAmount.toFixed(2)}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { padding: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
});
