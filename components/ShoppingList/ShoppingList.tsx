import React, { useEffect, useRef, useState } from "react";
import { View, Text, SectionList, Pressable, TextInput } from "react-native";
import { styles } from "./ShoppingListStyles";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getStoresWithIncompleteItems, getCompletedItemsFromStores, editItem, deleteItem } from "@/models/ItemsModel";

/*
Shopping list component
lists out each store and what items are allocated to that store
*/

interface ListsProps {
  itemFetchTrigger: boolean;
  setItemFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface for the section that is created which has a key object of title and data.
interface Section {
  title: string;
  data: string[];
}

const Lists: React.FC<ListsProps> = ({ itemFetchTrigger, setItemFetchTrigger }) => {
  return(
    <View>
      <Text style = {styles.checkboxText} >Lists</Text>
    </View>
  )
}


export default Lists;
