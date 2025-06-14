// import { Tabs } from "expo-router";

// export default function TabLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="home" options={{ title: "Home" }} />
//       <Tabs.Screen name="explore" options={{ title: "Explore" }} />
//       <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//     </Tabs>
//   );
// }
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "index") iconName = "home-variant";
          else if (route.name === "generatebill") iconName = "bill";
          else if (route.name === "settings") iconName = "cog";
          else if(route.name === "PurchaseBill") iconName = "cart-plus";
          else if(route.name === "sellbill") iconName = "cash-multiple";
          else if(route.name === "expirybill") iconName = "alert-circle";
          else if(route.name === "inventoryScreen") iconName = "pill";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        header: () => <CustomNavbar />, // ✅ Add Navbar here
      })}
    />
  );
}

// ✅ Custom Navbar Component
const CustomNavbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navTitle}>Medicine Inventory</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
