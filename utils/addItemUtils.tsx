import { addItem } from "@/models/ItemsModel"

//Function to add an item to the store
export const handleAddItem = (
    itemName: string, 
    selectedStore: {storeId: number, storeName: string},
    setItemFetchTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    setItemName: React.Dispatch<React.SetStateAction<string>>
) => {
    if (selectedStore && itemName) {
        addItem(selectedStore.storeId, itemName, 0, () => setItemFetchTrigger((prev) => !prev));
        setItemName("");
    } else {
        console.warn("No store selected or item name is empty");
    }
}