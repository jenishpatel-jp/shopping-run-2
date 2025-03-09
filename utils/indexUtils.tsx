import { View } from "react-native";
import { ListRenderItem } from "react-native";
import Store from "@/components/Store/Store";
import AddItem from "@/components/AddItem/AddItem";
import ShoppingList from "@/components/ShoppingList/ShoppingList";
import ResetButton from "@/components/Buttons/resetButton";
import { getItems } from "@/models/ItemsModel";
import { getStores } from "@/models/StoreModel";

// ListItem interface for the data array in the FlatList
export interface ListItem {
  key: string;
  component: JSX.Element;
}

// Generate the data array for the FlatList

export const getData = (
  stores: {storeId: number; storeName: string}[],
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  setItemFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
  itemFetchTrigger: boolean
): ListItem[] => [
  { key: "store", component: <Store setStoreFetchTrigger={setStoreFetchTrigger} /> },
  { key: "items", component: <AddItem stores={stores} setStoreFetchTrigger={setStoreFetchTrigger} setItemFetchTrigger={setItemFetchTrigger} /> },
  { key: "lists", component: <ShoppingList itemFetchTrigger={itemFetchTrigger} setItemFetchTrigger={setItemFetchTrigger} /> },
  { key: "reset", component: <ResetButton reset={() => console.log("Reset the button")} /> },
];
  





