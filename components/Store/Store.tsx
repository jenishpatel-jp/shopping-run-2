import React, { useState } from 'react'
import {View, Text, TextInput, Pressable } from 'react-native'
import { styles } from './StoreStyles';


/*
~~~ The Store Component ~~~ 

The component should allow you to enter a store name and click Add to save the store in the database. 

The add button needs a function that allows you to add the store to the database. 

*/

interface StoreProps {
    addStore: (storeName: string ) => void;
}

const Store: React.FC<StoreProps> = ( {addStore} ) => {

    //The Store component is responsible for adding stores and editing stores

    const [storeName, setStoreName] = useState("");
    const [buttonPressed, setButtonPressed] = useState(false);

    return (
        <View style= {styles.card} >
            <TextInput
                style={styles.textInput}
                placeholder='Enter store name...'
                placeholderTextColor={"#F5A418"}
                textAlign='center'
                value={storeName}
                onChangeText={setStoreName}
            />

            <View style={styles.addButtonContainer} >
                <Pressable
                onPress={() => {
                    addStore(storeName);
                    setStoreName("");
                }}

                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                style={( {pressed} ) => [
                    {
                        backgroundColor: pressed || buttonPressed ? "#5200A3" : "#40146B"
                    }
                ]}
                >
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </Pressable>
            </View>
        </View>
    )
};

export default Store