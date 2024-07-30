import React, { useState } from 'react'
import {View, Text, TextInput, Pressable } from 'react-native'
import { styles } from './StoreStyles';

interface StoreProps {
    addStore: (storeName: string ) => void;
}

const Store: React.FC<StoreProps> = ( {addStore} ) => {

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