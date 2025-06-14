import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define the types for navigation props (if using React Navigation)
type RootStackParamList = {
  ExpiryBill: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "ExpiryBill">;

const ExpiryBill: React.FC<Props> = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [supplierInvoice, setSupplierInvoice] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [partyName, setPartyName] = useState("");

  interface Item {
    name: string;
    batch: string;
    expiry: string;
    pack: string;
    quantity: string;
    purchaseRate: string;
    mrp: string;
    gst: string;
    discount: string;
    amount: string;
  }

  const [items, setItems] = useState<Item[]>([
    { name: "", batch: "", expiry: "", pack: "", quantity: "", purchaseRate: "", mrp: "", gst: "", discount: "", amount: "" },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { name: "", batch: "", expiry: "", pack: "", quantity: "", purchaseRate: "", mrp: "", gst: "", discount: "", amount: "" },
    ]);
  };

  const handleInputChange = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const submitExpiryBill = async () => {
    const expiryData = {
      supplierInvoice,
      receiptNumber,
      partyName,
      date,
      items,
    };

    try {
      const token = "your-auth-token"; // Replace with actual token
      const response = await fetch("https://medicine-inventory-system.onrender.com/api/bills/expiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expiryData),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Expiry Bill Created Successfully!");
      } else {
        Alert.alert("Error", result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f9fa", padding: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#007bff", marginBottom: 10 }}>
        Create Expiry Bill
      </Text>

      {/* Form Fields */}
      <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 15 }}>
        <TextInput
          placeholder="Supplier Invoice Number"
          value={supplierInvoice}
          onChangeText={setSupplierInvoice}
          style={styles.input}
        />
        <TextInput placeholder="Receipt Number" value={receiptNumber} onChangeText={setReceiptNumber} style={styles.input} />
        <TextInput placeholder="Party Name" value={partyName} onChangeText={setPartyName} style={styles.input} />

        {/* Date Picker */}
        <TouchableOpacity onPress={() => setOpen(true)} style={[styles.input, { alignItems: "center" }]}>
          <Text style={{ color: "#007bff" }}>{date.toDateString()}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>

      {/* Table Header */}
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            {["Item Name", "Batch", "Expiry Date", "Pack", "Quantity", "Purchase Rate", "MRP", "GST (%)", "Discount", "Amount"].map(
              (title, index) => (
                <Text key={index} style={styles.headerText}>
                  {title}
                </Text>
              )
            )}
          </View>

          {/* Table Rows */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {Object.keys(item).map((key, i) => (
                <TextInput
                  key={i}
                  style={styles.tableInput}
                  placeholder={key}
                  value={item[key as keyof Item]}
                  onChangeText={(text) => handleInputChange(index, key as keyof Item, text)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#007bff" }]} onPress={addItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]} onPress={submitExpiryBill}>
          <Text style={styles.buttonText}>Create Expiry Bill</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: { flexDirection: "row", backgroundColor: "#e9ecef", paddingVertical: 10, paddingHorizontal: 5 },
  headerText: { fontWeight: "bold", width: 100, textAlign: "center", color: "#007bff" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ddd", paddingVertical: 5 },
  tableInput: {
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
  },
  button: { padding: 10, borderRadius: 5, alignItems: "center", flex: 1, marginHorizontal: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
};

export default ExpiryBill;
