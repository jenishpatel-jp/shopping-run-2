import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./StoreStyles";
import { addStore } from "@/models/StoreModel";
import { handleAddStore } from "@/utils/storeUtils";
import EnterStoreName from "./StoreComponents/EnterStoreName";

interface storeProps {
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Store: React.FC<storeProps> = ({ setStoreFetchTrigger }) => {

  const [storeName, setStoreName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.card}>
      {/* Text input where the user enters the Store name. */}
      <EnterStoreName storeName={storeName} setStoreName={setStoreName} />

      {/* Add button */}
      <View style={styles.addButtonContainer}>
        <Pressable
          onPress={()=> handleAddStore(storeName, setStoreFetchTrigger, setStoreName, addStore)}
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
