import React from "react";
import Items from "../../components/Items/Items";
import Lists from "../../components/Lists/Lists";
import Store from "../../components/Store/Store";
import ResetButton from "../../components/Buttons/resetButton";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ListRenderItem } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "@/lib/db";
import { setUpStoresTable, getStores } from "@/models/StoreModel";
import { setUpItemsTable, getItems } from "@/models/ItemsModel";

export default function ShoppingRun() {
  const [stores, setStores] = useState<{ storeId: number; storeName: string }[]>([]);
  const [items, setItems] = useState<{ itemId: number; storeId: number; itemName: string; completed: number }[]>([]);
  const [storeFetchTrigger, setStoreFetchTrigger] = useState(false);
  const [itemFetchTrigger, setItemFetchTrigger] = useState(false);

  interface ListItem {
    key: string;
    component: JSX.Element;
  }

  const data: ListItem[] = [
    { key: "store", component: <Store setStoreFetchTrigger={setStoreFetchTrigger}/> },
    { key: "items", component: <Items stores={stores} setItemFetchTrigger={setItemFetchTrigger} /> },
    { key: "lists", component: <Lists stores={stores} items={items} /> },
    {
      key: "reset",
      component: <ResetButton reset={() => console.log("Reset the button")} />,
    },
  ];

  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <View style={styles.itemContainer}>{item.component}</View>
  );

  //useEffect to open the database and create Stores and Items table on mount
  useEffect(() => {
    openDatabase();
    setUpStoresTable();
    setUpItemsTable();
  }, []);

  //useEffect to fetch the stores from the Stores database and add it to the store useState.
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const allStores = await getStores();
        setStores(allStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, [storeFetchTrigger]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const allItems = await getItems();
        setItems(allItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [itemFetchTrigger]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#40146B",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5A318",
  },
  itemContainer: {
    marginBottom: 20,
  },
});
