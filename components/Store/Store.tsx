import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./StoreStyles";
import { addStore } from "@/models/StoreModel";
import { handleAddStore } from "@/utils/storeUtils";
import EnterStoreName from "./StoreComponents/EnterStoreName";
import AddStoreButton from "./StoreComponents/AddStoreButton";

interface storeProps {
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Store: React.FC<storeProps> = ({ setStoreFetchTrigger }) => {

  const [storeName, setStoreName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.card}>
      {/* Text input where the user enters the Store name. */}
      <EnterStoreName 
        storeName={storeName} 
        setStoreName={setStoreName} />

      {/* Add button */}
      <AddStoreButton 
        setStoreFetchTrigger={setStoreFetchTrigger} 
        setStoreName={setStoreName}
        storeName={storeName} 
        buttonPressed={buttonPressed}
        setButtonPressed={setButtonPressed}
        />
    </View>
  );
};

export default Store;
