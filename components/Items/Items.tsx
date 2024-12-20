import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './ItemStyles';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { editStore, deleteStore } from '@/models/Store';
import { addItem } from '@/models/Items';

interface ItemsProps {
    stores: { storeId: number, storeName: string }[];
}

const Items: React.FC<ItemsProps> = ({
    stores
}) => {

    const [buttonPressed, setButtonPressed] = useState(false);
    const [itemName, setItemName] = useState<string>("");
    const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
    const [newStoreName, setNewStoreName] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<{storeId: number, storeName:string} | null>(null);


    //Function to add an item to the store
    const handleAddItem = (itemName: string) => {
        if (selectedStore && itemName) {
            addItem(selectedStore.storeId, itemName);
            setItemName("");
        } else {
            console.warn("No store selected or item name is empty");
        }
    };

    //Function to select which store has been selected
    const selectStoreFunction = (storeId: number, storeName:string) => {
        if (!selectedStore || selectedStore.storeId !== storeId){
            setSelectedStore({ storeId, storeName });
        } else {
            setSelectedStore(null);
        }
    };

    const editFunction = ( storeId: number, storeName:string ) => {
        editStore(storeId, storeName);
        setNewStoreName("");
        setEditingStoreIndex(null);
    }

    return (
        <View style={styles.card}>

            {/* Text Input to enter each items name */}
            <TextInput
            placeholder='Enter Item'
            style={styles.textInput}
            placeholderTextColor={"#F5A418"}
            textAlign='center'
            value={itemName}
            onChangeText={setItemName}
            />

            {/* Mapping  each store*/}
            {stores.map( (store, index) => (

                <View key={index} style={styles.storeContainer}>
                    {/* Conditonal - Text input | Store name */}
                    {editingStoreIndex === index ? (
                        <TextInput
                            style={styles.editTextInput}
                            placeholder={store.storeName}
                            value={newStoreName}
                            onChangeText={setNewStoreName}
                            placeholderTextColor={"#F5A418"}
                        />
                    ):(
                        <View style={styles.checkboxContainer} >
                            <CustomCheckbox
                                key={index}
                                onPress={() => selectStoreFunction(store.storeId, store.storeName)}
                                checked={ store.storeName === store.storeName }
                            />
                            <Text style={styles.checkbox}>{store.storeName}</Text>
                        </View>
                    )} 


                    {/* Conditional - Update | Edit */}
                    <View style={styles.updateView}>
                    {editingStoreIndex === index ? (

                        // editStore function
                        <Pressable onPress={() => editFunction(store.storeId, newStoreName)}>
                            <Text style={styles.buttonText} >Update</Text>
                        </Pressable>):(
                        <Pressable>
                            <Feather 
                                style={styles.edit} 
                                name='edit' size={26} 
                                color='#F5A418'
                                onPress={() => setEditingStoreIndex(index)}
                                />
                        </Pressable>    
                        )}
                        <Pressable
                            onPress={()=> deleteStore(store.storeId)}
                        >
                            <MaterialIcons 
                                style={styles.delete} 
                                name='delete-outline'  
                                size={30}
                                color="#F5A418"
                                />
                        </Pressable>
                    </View>

                </View>
                ))}

                {/* Add Button */}

                <View style={styles.addButtonContainer}>
                    <Pressable
                        onPress={()=> handleAddItem(itemName)}
                        onPressIn={()=> setButtonPressed(true)}
                        onPressOut={(()=> setButtonPressed(false))}
                    >
                        <Text style={styles.buttonText}>
                            Add
                        </Text>
                    </Pressable>
                    
                </View>
             
        
        </View>
    )
};

export default Items;