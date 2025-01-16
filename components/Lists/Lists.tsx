import React, { useEffect, useState } from "react";
import { View, Text, SectionList, Pressable, TextInput } from "react-native";
import { styles } from "./ListStyles";
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
  //useStates to store incomeplete items and completed items
  const [incomepleteItems, setIncompleteItems] = useState<Record<string, [number, string][]>>({});
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  //useStates to store the selected item and the index of the item
  const [itemSelected, setItemSelected] = useState<string>("");
  const [indexOfItem, setIndexOfItem] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");

  //useEffect to fetch the incomplete
  useEffect(() => {
    const fetchIncompleteItems = async () => {
      try {
        const incompleteItems = await getStoresWithIncompleteItems();
        setIncompleteItems(incompleteItems);
      } catch (error) {
        console.error("Error fetching incomplete items:", error);
      }
    };

    fetchIncompleteItems();
  }, [itemFetchTrigger]);

  //useEffect to fetch the completed items
  useEffect(() => {
    const fetchCompletedItems = async () => {
      try {
        const completedItems = await getCompletedItemsFromStores();
        setCompletedItems(completedItems); 
      } catch (error) {
        console.error("Error fetching completed items:", error);
      }
  };
  fetchCompletedItems();
}, [itemFetchTrigger]);

const handleUpdateItem = async (itemId: number, itemName: string) => {
  await editItem(itemId, itemName, () => setItemFetchTrigger((prev) => !prev)); 
  setNewItemName("");
  setItemSelected("");
  setIndexOfItem(null);
};

const handleEditItem = (itemName: string, index: number) => {
  setItemSelected(itemName);
  setIndexOfItem(index);
  setNewItemName(itemName);
}

const handleDeleteItem = async (itemId: number) => {
  await deleteItem(itemId, () => setItemFetchTrigger((prev) => !prev));
}


//SectionList component to render the header and list
  const sections: Section[] = Object.keys(incomepleteItems).map((store) => ({
    title: store,
    data: incomepleteItems[store].map((item) => item[1]),
  }));

  // if completedItem has a item in it, a title called 'Completed' is added. The data is the list of completed items.
  if (completedItems.length > 0) {
    sections.push({ title: 'Completed', data: completedItems });
  };

  return (
    

    // Uses the SectionList component to render the header and list
    <SectionList
        sections={sections}
        renderSectionHeader={({ section: {title} }) => (
            <Text style={styles.storeName}>{title}</Text>
        )}
        renderItem={({ item, section: {title}, index }) => (

            <View>
                {/* If the title is not completed, it will render the items, otherwise it will render the completed list */}
                {title !== 'Completed' ? (
                    <View style={styles.itemsContainer}>

                        {/* Checks if the store name and item is the selected item. This view shows shows the text input or checkbox */}
                        {itemSelected === item && indexOfItem === index ? 
                        (
                            <TextInput
                                style={styles.editTextInput}
                                value={newItemName}
                                onChangeText={setNewItemName}
                                placeholder={item}
                                placeholderTextColor={"#F5A418"}
                                onFocus={()=> console.log('focus')}
                                onBlur={()=> console.log('blur')}
                            />
                        ) 
                        : 
                        ( 
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    style={styles.checkbox}
                                    color={itemSelected === item ? "#F5A418" : "#F5A418"}
                                    value={itemSelected === item}
                                    onValueChange={() => ()=> console.log('checkbox')}
                                  />
                                <Text style={styles.checkboxText}> {item} </Text>
                            </View>
                        )}
                        {/* The view will show Update if the item has been ticked, otherwise it will show the edit icon */}
                        <View style={styles.updateView}>
                            
                            {itemSelected === item && indexOfItem === index ? 
                            (
                                <Pressable onPress={()=> handleUpdateItem(incomepleteItems[title][index][0], newItemName)}>
                                    <Text style={styles.buttonText}>Update</Text>
                                </Pressable>
                            ) 
                            : 
                            (
                                <Pressable onPress={() => handleEditItem(item, index)}>
                                    <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
                                </Pressable>
                            )}
                            
                            <Pressable onPress={() => handleDeleteItem(incomepleteItems[title][index][0])}>
                                <MaterialIcons style={styles.delete} name="delete-outline" size={30} color="#F5A418" />
                            
                            </Pressable>

                        </View>
                    </View>
                ) 
                // If the title is completed, it will render the completed items
                : 
                (
                    <Text style={styles.completedItems}>{item}</Text>
                )}
            </View>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
    />
  );
};

export default Lists;
