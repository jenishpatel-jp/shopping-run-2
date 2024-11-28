import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './ItemStyles';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { addStore, editStore, deleteStore, getStores } from '@/models/Store';
import { addItem } from '@/models/Items';


/* 

Things to do: 

- Edit store function button is not working 
- Update button does not work
- The checkbox button doesn't work
- 
*/


const Items: React.FC = () => {

    const [buttonPressed, setButtonPressed] = useState(false);
    const [itemName, setItemName] = useState<string>("");
    const [stores, setStores] = useState<{ storeId: number; storeName: string }[]>([]);
    const [selectedStore, setSelectedStore] = useState<string | null>();
    const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
    const [newStoreName, setNewStoreName] = useState<string>("");


    //useEffect to fetch stores and add them to the storeList useState. Might need to update to ensure it is called whenever the storeList is updated. 

    useEffect(() => {
        const fetchStores = async() => {
            try {
                const allStores = await getStores();
                setStores(allStores);
            }catch(error){
                console.error('Error fetching stores:', error)
            }
        }

        fetchStores();
    }, [stores]);

    //Function to add an item to the store
    const handleAddItem = (storeId: number, itemName: string) => {
        if (selectedStore && itemName) {
            //add item function here
            addItem(storeId,itemName)
            setItemName("");
        }
    };

    //Function to select which store has been selected
    const selectStoreFunction = (store: string) => {
        if (!selectedStore){
            setSelectedStore(store)
        } else {
            setSelectedStore(null);
        }
    };

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

                    {/* Conditonal - Text input | store name */}
                    {editingStoreIndex === index ? (
                        <TextInput
                            style={styles.editTextInput}
                            value={newStoreName}
                            onChangeText={() => setNewStoreName(newStoreName)}
                        />
                    ):(
                        <View style={styles.checkboxContainer} >
                            <CustomCheckbox
                                key={index}
                                onPress={() => selectStoreFunction(store.storeName)}
                                checked={ selectedStore === store.storeName }
                            />
                            <Text style={styles.checkbox}>{store.storeName}</Text>
                        </View>
                    )} 

                    {/* Conditional - Update | Edit */}
                    <View style={styles.updateView}>
                    {editingStoreIndex === index ? (

                        // editStore function
                        <Pressable onPress={() => editStore(store.storeId, newStoreName)}>
                            <Text>Update</Text>
                        </Pressable>):(
                        <Pressable>
                            <Feather 
                                style={styles.edit} 
                                name='edit' size={26} 
                                color='#F5A418'/>
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
                        onPress={()=> console.log("Add item")}
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