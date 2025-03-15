import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { openDatabase } from "@/lib/db";
import { setUpStoresTable } from "@/models/StoreModel";
import { setUpItemsTable } from "@/models/ItemsModel";
import { getData, renderItem, fetchItems, fetchStores } from "@/utils/indexUtils";
import { styles } from "./indexStyles";

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

  //Flatlist that will render the stores and items
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
