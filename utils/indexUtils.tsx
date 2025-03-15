import { View, ListRenderItem} from "react-native";
import Store from "@/components/Store/Store";
import AddItem from "@/components/AddItem/AddItem";
import ShoppingList from "@/components/ShoppingList/ShoppingList";
import ResetButton from "@/components/Buttons/resetButton";
import { getItems } from "@/models/ItemsModel";
import { getStores } from "@/models/StoreModel";
import { styles } from "@/app/(tabs)/indexStyles";

// ListItem interface for the data array in the FlatList
export interface ListItem {
  key: string;
  component: JSX.Element;
}

/* 

Generate the data array for the FlatList
- Store component
- Items component
- Lists component
- Reset button component
*/

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

// Render the items in the FlatList	
export const renderItem: ListRenderItem<ListItem> = ({ item }) => (
  <View style={styles.itemContainer}>{item.component}</View>
)

// fetch stores function
 export const fetchStores = async (setStores: React.Dispatch<React.SetStateAction<{ storeId: number; storeName: string }[]>>) => {
  try {
    const allStores = await getStores();
    setStores(allStores);
  } catch (error) {
    console.error("Error fetching stores:", error);
  }
 }

// fetch items function
export const fetchItems = async () => {
  try {
    const allItems = await getItems();
    console.log(allItems);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}
  







