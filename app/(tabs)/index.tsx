import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ListRenderItem } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "@/lib/db";
import { setUpStoresTable, getStores } from "@/models/StoreModel";
import { setUpItemsTable, getItems } from "@/models/ItemsModel";
import { ListItem, getData, renderItem, fetchItems, fetchStores } from "@/utils/indexUtils";

export default function ShoppingRun() {
  const [stores, setStores] = useState<{ storeId: number; storeName: string }[]>([]);
  const [storeFetchTrigger, setStoreFetchTrigger] = useState(false);
  const [itemFetchTrigger, setItemFetchTrigger] = useState(false);


  //useEffect to open the database and create Stores and Items table on mount
  useEffect(() => {
    openDatabase();
    setUpStoresTable();
    setUpItemsTable();
  }, []);

  //useEffect to fetch the stores from the Stores database and add it to the store useState.
  useEffect(() => {
    fetchStores(setStores);
  }, [storeFetchTrigger]);

  //Added to test the getItems function and see if items were in the database
  useEffect(() => {
    fetchItems()
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={getData(stores, setStoreFetchTrigger, setItemFetchTrigger, itemFetchTrigger)}
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
