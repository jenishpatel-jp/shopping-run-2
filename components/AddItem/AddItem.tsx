import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./AddItemStyles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { editStore, deleteStore } from "@/models/StoreModel";
import { addItem } from "@/models/ItemsModel";

interface AddItemProps {
  stores: { storeId: number; storeName: string }[];
  setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setItemFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddItem: React.FC<AddItemProps> = ({ stores, setStoreFetchTrigger, setItemFetchTrigger }) => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [itemName, setItemName] = useState<string>("");
  const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
  const [newStoreName, setNewStoreName] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<{storeId: number; storeName: string;} | null>(null);

  //Function to add an item to the store
  const handleAddItem = (itemName: string) => {
    if (selectedStore && itemName) {
      addItem(selectedStore.storeId, itemName, 0, () => setItemFetchTrigger((prev) => !prev));
      setItemName("");
    } else {
      console.warn("No store selected or item name is empty");
    }
  };

  //Function to select which store has been selected
  const selectStoreFunction = (storeId: number, storeName: string) => {
    if (!selectedStore || selectedStore.storeId !== storeId) {
      setSelectedStore({ storeId, storeName });
    } else {
      setSelectedStore(null);
    }
  };

  //Function to edit a store
  const handleUpdateStore = async (storeId: number, storeName: string) => {
    if (!storeName) {
      console.warn("Store name is empty");
      return;
    }
    await editStore(storeId, storeName, () => setStoreFetchTrigger((prev) => !prev));
    setNewStoreName("");
    setEditingStoreIndex(null);
  };

  // Code added to ensure null is not returned so I can toggle the checkbox on and off when selected
  const isStoreSelected = () => {
    if (selectedStore) {
      return selectedStore.storeName;
    }
  };

  const handleDeleteStore = async (storeId: number) => {
    await deleteStore(storeId, () => setStoreFetchTrigger((prev) => !prev));
  };

  return (
    <View style={styles.card}>
      {/* Text Input to enter each items name */}
      <TextInput
        placeholder="Enter Item"
        style={styles.textInput}
        placeholderTextColor={"#F5A418"}
        textAlign="center"
        value={itemName}
        onChangeText={setItemName}
      />

      {/* Mapping  each store*/}
      {stores.map((store, index) => (
        <View key={index} style={styles.storeContainer}>
          {/* Conditonal - Text input | Store name */}
          {editingStoreIndex === index ? (
            <TextInput
              style={styles.editTextInput}
              value={newStoreName}
              onChangeText={setNewStoreName}
              placeholderTextColor={"#F5A418"}
              placeholder={store.storeName}
            />
          ) : (
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                key={index}
                onPress={() =>
                  selectStoreFunction(store.storeId, store.storeName)
                }
                checked={isStoreSelected() === store.storeName}
              />
              <Text style={styles.checkboxText}>{store.storeName}</Text>
            </View>
          )}

          {/* Conditional - Update | Edit */}
          <View style={styles.updateView}>
            {editingStoreIndex === index ? (
              // editStore function
              <Pressable
                onPress={() => handleUpdateStore(store.storeId, newStoreName)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
            ) : (
              <Pressable>
                <Feather
                  style={styles.edit}
                  name="edit"
                  size={26}
                  color="#F5A418"
                  onPress={() => setEditingStoreIndex(index)}
                />
              </Pressable>
            )}
            <Pressable onPress={() => handleDeleteStore(store.storeId)}>
              <MaterialIcons
                style={styles.delete}
                name="delete-outline"
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
          onPress={() => handleAddItem(itemName)}
          onPressIn={() => setButtonPressed(true)}
          onPressOut={() => setButtonPressed(false)}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddItem;
