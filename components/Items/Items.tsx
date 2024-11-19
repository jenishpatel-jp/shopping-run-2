import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './ItemStyles';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { addStore, editStore, deleteStore, getStores } from '@/models/Store';

interface ItemsProps {
    newStoreName: string;
    setNewStoreName: (name: string) => void;
}

const Items: React.FC<ItemsProps> = ( {newStoreName, setNewStoreName} ) => {

    const [buttonPressed, setButtonPressed] = useState(false);
    const [itemName, setItemName] = useState<string>("");
    const [stores, setStores] = useState<string[]>([]);

    useEffect(() => {
        const fetchStores = async() => {
            try {
                const storeList = await getStores();
                setStores(storeList);
            }catch(error){
                console.error('Error fetching stores:', error)
            }
        }

        fetchStores();
    }, []);


    /* 
    ~~~ Display the Stores ~~~
    getStores is a function that returns the storeList. 
    I can get the stores and add it to a variable and map that store. 

    I need to ensure that as a new store is added, the storeList is updated and rendered again. 

    I can use a useEffect function to udpate run whenever a store is added. 
    Maybe I can use a useState function to store the storeList? 
    
    
    */

    useEffect


    const storeList = getStores();

    

    // const handleAddItem = () => {
    //     if (selectedStore && itemName) {
    //         addItem(selectedStore, itemName);
    //         setItemName("");
    //     }
    // };

    // const selectStoreFunction = (store: string) => {
    //     if (!selectedStore){
    //         setSelectedStore(store)
    //     } else {
    //         setSelectedStore(null);
    //     }
    // };

    return (
        <View style={styles.card}>

            {/* Text Input to enter each items name */}
            <TextInput
            placeholder='Enter Item'
            style={styles.textInput}
            textAlign='center'
            value={itemName}
            onChangeText={setItemName}
            />

            {/* Mapping  */}
             
        
        </View>


        
        // <View style={styles.card} >

        //     {/* Text input to enter each items name */}

        //     <TextInput
        //     placeholder='Enter Item'
        //     placeholderTextColor={"#F5A418"}
        //     style={styles.textInput}
        //     textAlign='center'
        //     value={itemName}
        //     onChangeText={setItemName}
        //     />

        //     {/* mapping the stores */}
        //     {storeList.map( (store, index) => (
        //     <View key={index} style={styles.storeContainer} >

        //     {/* If the store is being edited, a text input will appear, otherwise the store name that has been set will appear */}

        //     {editingStoreIndex === index ? (
        //         <TextInput
        //             style={styles.editTextInput}
        //             value={newStoreName}
        //             onChangeText={setNewStoreName}
        //             />
        //         ): (
        //     <View style={styles.checkboxContainer} >
        //             {/* <Checkbox
        //                 style={styles.checkbox}
        //                 value={selectedStore === store}
        //                 onValueChange={() => selectStoreFunction(store) }
        //                 color={selectedStore === store ? "#F5A418": "#F5A418"}
        //                 /> */}
        //             <CustomCheckbox 
        //                 key={index}
        //                 checked={ selectedStore === store }
        //                 onPress={ () => selectStoreFunction(store) }
        //             />
        //             <Text style={styles.checkboxText} >{store}</Text>

        //     </View>
        //         )}

        //     {/* If the store is being edited, the update button will appear, otherwise the edit and trash icon will appear */}

        //     <View style={styles.updateView} >

        //         {editingStoreIndex === index ? (
        //         <Pressable onPress={updateStoreName} >
        //             <Text style={styles.buttonText} >Update</Text>
        //         </Pressable>

        //         ):(

        //         <Pressable
        //             onPress={() => editStore(index)}
        //         >
        //             <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
        //         </Pressable>
        //         )}

        //         <Pressable
        //         onPress={() => deleteStore(index) }
        //         >
        //             <MaterialIcons style={styles.delete}  name="delete-outline" size={30} color="#F5A418" />
        //         </Pressable>
        //     </View>
        //     </View>
        //     )
        //     )}

        //     {/* Add Button  */}
        //     <View style={styles.addButtonContainer} >
        //         <Pressable
        //             onPress={
        //             handleAddItem
        //             }
        //             onPressIn={() => setButtonPressed(true)}
        //             onPressOut={() => setButtonPressed(false)}
        //             style={( {pressed} ) => [
        //                 {
        //                     backgroundColor: pressed || buttonPressed ? "#5200A3" : "#40146B"
        //                 }
        //             ]}
        //             >
        //             <Text style={styles.buttonText}>
        //                 Add
        //             </Text>
        //         </Pressable>
        //     </View>

        // </View>
    )
};

export default Items;