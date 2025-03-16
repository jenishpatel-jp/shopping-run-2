import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "./AddItemStyles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { handleAddItem, selectStoreFunction, handleUpdateStore, isStoreSelected, handleDeleteStore } from "@/utils/addItemUtils";
import { EnterItemTextInput } from "./AddItemComponents/EnterItem";

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


  return (
    <View style={styles.card}>
      {/* Text Input to enter each items name */}
      <EnterItemTextInput itemName={itemName} setItemName={setItemName} />

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
                  selectStoreFunction(store.storeId, store.storeName, selectedStore, setSelectedStore)
                }
                checked={isStoreSelected(selectedStore) === store.storeName}
              />
              <Text style={styles.checkboxText}>{store.storeName}</Text>
            </View>
          )}

          {/* Conditional - Update | Edit */}
          <View style={styles.updateView}>
            {editingStoreIndex === index ? (
              // editStore function
              <Pressable
                onPress={() => handleUpdateStore(store.storeId, newStoreName, setStoreFetchTrigger, setNewStoreName, setEditingStoreIndex)}
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
            <Pressable onPress={() => handleDeleteStore(store.storeId, setStoreFetchTrigger)}>
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
          onPress={() => handleAddItem(itemName, selectedStore, setItemFetchTrigger, setItemName)}
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
