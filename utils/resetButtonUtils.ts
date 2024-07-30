export const reset = (
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key:string]: string[] }>>,
    setStoreList: React.Dispatch<React.SetStateAction<string[]>>,
    setCompletedItem: React.Dispatch<React.SetStateAction<string[]>> 
) => {
    setShoppingList({});
    setStoreList([]);
    setCompletedItem([]);
};