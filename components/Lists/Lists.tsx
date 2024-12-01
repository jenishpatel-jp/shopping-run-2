import React, { useState } from 'react';
import { View, Text, SectionList, Pressable, TextInput } from 'react-native';
import { styles } from './ListStyles';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/*
Shopping list component
lists out each store and what items are allocated to that store
*/

interface ListsProps {
    stores: { storeId: number, storeName: string }[];
    items: { itemId: number, storeId: number, itemName: string, completed: number }[];
}

// interface for the section that is created which has a key object of title and data. 
interface Section {
    title: string;
    data: string[];
}

const Lists: React.FC<ListsProps> = ( { stores, items } ) => {

    //useState to determine which item has been selected
    const [selectedItem, setSelectedItem] = useState<string | null>(null);


    /* Check off function   */

    /* Need to import the items  */


    // Created a sections constant where the keys are mapped to an object, title and data. title has the object.key (stores) and the data has values of the shopping list. 
    // const sections: Section[] = Object.keys(shoppingList).map((store) => ({
    //     title: store,
    //     data: shoppingList[store]
    // }));

    // // if completedItem has a item in it, a title called 'Completed' is added. The data is the list of completed items. 
    // if (completedItem.length > 0) {
    //     sections.push({ title: 'Completed', data: completedItem });
    // }

    return (
        <View>
            <Text>Temporary</Text>
        </View>
        // Uses the SectionList component to render the header and list
        // <SectionList
        //     sections={sections}
        //     renderSectionHeader={({ section }) => (
        //         <Text style={styles.storeName}>{section.title}</Text>
        //     )}
        //     renderItem={({ item, section }) => (
        //         <View>
        //             {/* If the title is not completed, it will render the items, otherwise it will render the completed list */}
        //             {section.title !== 'Completed' ? (
        //                 <View style={styles.itemsContainer}>

        //                     {/* Checks if the store name and item is the selected item. This view shows shows the text input or checkbox */}
        //                     {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ? (
        //                         <TextInput
        //                             style={styles.editTextInput}
        //                             value={newItemName}
        //                             onChangeText={setNewItemName}
        //                         />
        //                     ) : (
        //                         <View style={styles.checkboxContainer}>
        //                             <Checkbox
        //                                 style={styles.checkbox}
        //                                 color={selectedItem === item ? "#F5A418" : "#F5A418"}
        //                                 value={selectedItem === item}
        //                                 onValueChange={() => {
        //                                     setSelectedItem(item);
        //                                     checkOffItem(item);
        //                                 }}
        //                             />
        //                             <Text style={styles.checkboxText}> {item} </Text>
        //                         </View>
        //                     )}
        //                     {/* The view will show Update if the item has been ticked, otherwise it will show the edit icon */}
        //                     <View style={styles.updateView}>
        //                         {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ? (
        //                             <Pressable onPress={updateItemName}>
        //                                 <Text style={styles.buttonText}>Update</Text>
        //                             </Pressable>
        //                         ) : (
        //                             <Pressable onPress={() => editItem(section.title, item)}>
        //                                 <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
        //                             </Pressable>
        //                         )}
        //                         <Pressable onPress={() => deleteItem(section.title, item)}>
        //                             <MaterialIcons style={styles.delete} name="delete-outline" size={30} color="#F5A418" />
        //                         </Pressable>
        //                     </View>
        //                 </View>
        //             ) : (
        //                 <Text style={styles.completedItems}>{item}</Text>
        //             )}
        //         </View>
        //     )}
        //     keyExtractor={(item, index) => item + index}
        // />
    );
};

export default Lists