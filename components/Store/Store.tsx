import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./StoreStyles";
import { addStore } from "@/models/StoreModel";

/*
~~~ The Store Component ~~~ 

The component should allow you to enter a store name and click Add to save the store in the database. 

The add button needs a function that allows you to add the store to the database. 

*/
interface storeProps {
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Store: React.FC<storeProps> = ({ setStoreFetchTrigger }) => {
  //The Store component is responsible for adding stores and editing stores

  //The storeName useState will store the name of the store temporarily before it is added to the Database.
  const [storeName, setStoreName] = useState("");

  //buttonPressed useState will determine what colour the button will be when pressed
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.card}>
      {/* Text input where the user enters the Store name. */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter store name..."
        placeholderTextColor={"#F5A418"}
        textAlign="center"
        value={storeName}
        onChangeText={setStoreName}
      />

      {/* Add button */}
      <View style={styles.addButtonContainer}>
        <Pressable
          onPress={() => {
            addStore(storeName);
            setStoreName("");
          }}
          // Updates the useState buttonPressed and determines the colour of the button.
          onPressIn={() => setButtonPressed(true)}
          onPressOut={() => setButtonPressed(false)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed || buttonPressed ? "#5200A3" : "#40146B",
            },
          ]}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Store;
