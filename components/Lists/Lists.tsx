import React, { useEffect, useState } from "react";
import { View, Text, SectionList, Pressable, TextInput } from "react-native";
import { styles } from "./ListStyles";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getStoresWithIncompleteItems, getCompletedItemsFromStores, editItem } from "@/models/ItemsModel";

/*
Shopping list component
lists out each store and what items are allocated to that store
*/

interface ListsProps {
  stores: { storeId: number; storeName: string }[];
  items: {
    itemId: number;
    storeId: number;
    itemName: string;
    completed: number;
  }[];
}

// interface for the section that is created which has a key object of title and data.
interface Section {
  title: string;
  data: string[];
}

const Lists: React.FC<ListsProps> = ({ stores, items }) => {
  //useStates to store incomeplete items and completed items
  const [storeAndItems, setStoreAndItems] = useState<Record<string, string[]>>({});
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  //useStates to store the selected item, store and index of the item
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [storeOfItem, setStoreOfItem] = useState<string | null>(null);
  const [indexOfItem, setIndexOfItem] = useState<number | null>(null);


  //useEffect to fetch the incomplete
  useEffect(() => {
    const fetchIncompleteItems = async () => {
      try {
        const incompleteItems = await getStoresWithIncompleteItems();
        setStoreAndItems(incompleteItems);
      } catch (error) {
        console.error("Error fetching incomplete items:", error);
      }
    };

    fetchIncompleteItems();
  }, []);

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
}, []);


//SectionList component to render the header and list
  const sections: Section[] = Object.keys(storeAndItems).map((store) => ({
    title: store,
    data: storeAndItems[store].map((item) => item[0]),
  }));

  // if completedItem has a item in it, a title called 'Completed' is added. The data is the list of completed items.
  if (completedItems.length > 0) {
    sections.push({ title: 'Completed', data: completedItems });
  };

  return (
    

    // Uses the SectionList component to render the header and list
    <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => (
            <Text style={styles.storeName}>{section.title}</Text>
        )}
        renderItem={({ item, section }) => (

            <View>
                {/* If the title is not completed, it will render the items, otherwise it will render the completed list */}
                {section.title !== 'Completed' ? (
                    <View style={styles.itemsContainer}>

                        {/* Checks if the store name and item is the selected item. This view shows shows the text input or checkbox */}
                        {storeOfItem === section.title && indexOfItem === storeAndItems[section.title].indexOf(item) ? (
                            <TextInput
                                style={styles.editTextInput}
                                //value={storeAndItems}
                                onChangeText={()=> console.log('onChangeText')}
                            />
                        ) : ( 
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    style={styles.checkbox}
                                    color={selectedItem === item ? "#F5A418" : "#F5A418"}
                                    value={selectedItem === item}
                                    onValueChange={() => {
                                        setSelectedItem(item);
                                        //checkOffItem(item);
                                    }}
                                  />
                                <Text style={styles.checkboxText}> {item} </Text>
                            </View>
                        )}
                        {/* The view will show Update if the item has been ticked, otherwise it will show the edit icon */}
                        <View style={styles.updateView}>
                            {storeOfItem === section.title && indexOfItem === storeAndItems[section.title].indexOf(item) ? (
                                <Pressable onPress={()=> console.log('update')}>
                                    <Text style={styles.buttonText}>Update</Text>
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => console.log('edit')}>
                                    <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
                                </Pressable>
                            )}
                            <Pressable onPress={() => console.log('delete')}>
                                <MaterialIcons style={styles.delete} name="delete-outline" size={30} color="#F5A418" />
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.completedItems}>{item}</Text>
                )}
            </View>
        )}
        keyExtractor={(item, index) => item + index}
    />
  );
};

export default Lists;
