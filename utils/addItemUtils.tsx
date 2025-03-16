import { addItem } from "@/models/ItemsModel"
import { editStore, deleteStore } from "@/models/StoreModel"

//Function to add an item to the store
export const handleAddItem = (
    itemName: string, 
    selectedStore: {storeId: number, storeName: string} | null,
    setItemFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    setItemName: React.Dispatch<React.SetStateAction<string>>
) => {
    if (!selectedStore || !itemName) {
        console.warn("No store selected or item name is empty");
        return;
    }
    addItem(selectedStore.storeId, itemName, 0, () => setItemFetchTrigger((prev) => !prev));
    setItemName("");
};

//Function to select which store has been selected
export const selectStoreFunction = (
    storeId: number, 
    storeName: string, 
    selectedStore: {storeId: number; storeName: string} | null,
    setSelectedStore: React.Dispatch<React.SetStateAction<{storeId: number; storeName: string;} | null>>
) => {
    if (!selectedStore || selectedStore.storeId !== storeId) {
        setSelectedStore({ storeId, storeName });
    } else {
        setSelectedStore(null);
    }
};

//Function to edit a store
export const handleUpdateStore = async (
    storeId: number, 
    storeName: string, 
    setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    setNewStoreName: React.Dispatch<React.SetStateAction<string>>,
    setEditingStoreIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
    if (!storeName) {
        console.warn("Store name is empty");
        return;
    }
    await editStore(storeId, storeName, () => setStoreFetchTrigger((prev) => !prev));
    setNewStoreName("");
    setEditingStoreIndex(null);
};

// Code added to ensure null is not returned so I can toggle the checkbox on and off when selected
export const isStoreSelected = (selectedStore: {storeId: number; storeName: string} | null) => {
    if (selectedStore) {
        return selectedStore.storeName;
    }
};

//Function to delete a store   
export const handleDeleteStore = async (
    storeId: number, 
    setStoreFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>
) => {
    await deleteStore(storeId, () => setStoreFetchTrigger((prev) => !prev));
};