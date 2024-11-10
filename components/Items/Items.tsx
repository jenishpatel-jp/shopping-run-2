import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './ItemStyles';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

interface ItemsProps {
    storeList: string [];
    newStoreName: string;
    setNewStoreName: (name: string) => void;
}

const Items: React.FC<ItemsProps> = ( {storeList, newStoreName, setNewStoreName} ) => {

    const [buttonPressed, setButtonPressed] = useState(false);
    const [selectedStore, setSelectedStore] = useState <string | null > (null);
    const [itemName, setItemName] = useState<string>("");

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
        <View>
            <Text>Temporary</Text>
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