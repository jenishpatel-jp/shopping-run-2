import React, { useState } from 'react';
import { View, Text, SectionList, Pressable, TextInput } from 'react-native';
import { styles } from './ListStyles';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface ListsProps {
    shoppingList: { [key: string]: string[] };
    deleteItem: (store: string, item: string) => void;
    updateItemName: () => void;
    editItem: (store: string, item: string) => void;
    newItemName: string;
    setNewItemName: (name: string) => void;
    indexOfItem: number | null;
    storeOfItem: string | null;
    completedItem: string[],
    setCompletedItem: (completedItem: string[]) => void;
}

interface Section {
    title: string;
    data: string[];
}

const Lists: React.FC<ListsProps> = ({
    shoppingList,
    deleteItem,
    updateItemName,
    editItem,
    newItemName,
    setNewItemName,
    indexOfItem,
    storeOfItem,
    completedItem,
    setCompletedItem
}) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const checkOffItem = (item: string) => {
        setCompletedItem([...completedItem, item]);
        deleteItemFromShoppingList(item);
        setSelectedItem(null);
    };

    const deleteItemFromShoppingList = (item: string) => {
        for (const store in shoppingList) {
            if (shoppingList[store].includes(item)) {
                deleteItem(store, item);
                break;
            }
        }
    };

    const sections: Section[] = Object.keys(shoppingList).map((store) => ({
        title: store,
        data: shoppingList[store]
    }));

    if (completedItem.length > 0) {
        sections.push({ title: 'Completed', data: completedItem });
    }

    return (
        <SectionList
            sections={sections}
            renderSectionHeader={({ section }) => (
                <Text style={styles.storeName}>{section.title}</Text>
            )}
            renderItem={({ item, section }) => (
                <View>
                    {section.title !== 'Completed' ? (
                        <View style={styles.itemsContainer}>
                            {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ? (
                                <TextInput
                                    style={styles.editTextInput}
                                    value={newItemName}
                                    onChangeText={setNewItemName}
                                />
                            ) : (
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        color={selectedItem === item ? "#F5A418" : "#F5A418"}
                                        value={selectedItem === item}
                                        onValueChange={() => {
                                            setSelectedItem(item);
                                            checkOffItem(item);
                                        }}
                                    />
                                    <Text style={styles.checkboxText}> {item} </Text>
                                </View>
                            )}
                            <View style={styles.updateView}>
                                {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ? (
                                    <Pressable onPress={updateItemName}>
                                        <Text style={styles.buttonText}>Update</Text>
                                    </Pressable>
                                ) : (
                                    <Pressable onPress={() => editItem(section.title, item)}>
                                        <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
                                    </Pressable>
                                )}
                                <Pressable onPress={() => deleteItem(section.title, item)}>
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

export default Lists