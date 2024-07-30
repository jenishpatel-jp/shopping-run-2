export const addItem = (
    store:string,
    item: string, 
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key:string] : string[]}>>,
) => {
    if (store && item){
        setShoppingList( prevList => {
            const items = prevList[store] ? [...prevList[store], item] : [item];
            const newList = {...prevList, [store]: items};
            return newList;
        });
    };
};

export const deleteItem = (
    store: string,
    item: string,
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key:string]:string[] }>>,
) => {
    setShoppingList(prevShoppingList => {
        const updatedShoppingList = { ...prevShoppingList };
        if (updatedShoppingList[store]){
            updatedShoppingList[store] = updatedShoppingList[store].filter(i => i !== item);
        }
        return updatedShoppingList;
    });
};

//first part of editing an item
export const editItem = (
    store: string, 
    item: string,
    shoppingList: { [key:string] : string[] },
    setStoreOfItem: React.Dispatch<React.SetStateAction<string | null>>,
    setIndexOfItem:React.Dispatch<React.SetStateAction<number | null>>,
    setNewItemName: React.Dispatch<React.SetStateAction<string>>
) =>  {
    setStoreOfItem(store);
    const index = shoppingList[store].indexOf(item);
    if (index !== -1){
        setIndexOfItem(index);
    }
    setNewItemName(shoppingList[store][index]);
};

//second part of editing an item
export const updateItemName = (
    storeOfItem: string | null,
    newItemName: string,
    indexOfItem: number | null, 
    setShoppingList: React.Dispatch<React.SetStateAction<{ [key:string]: string[] }>>,
    setStoreOfItem: React.Dispatch<React.SetStateAction<string | null>>,
    setIndexOfItem:React.Dispatch<React.SetStateAction<number | null>>,
    setNewItemName: React.Dispatch<React.SetStateAction<string>>
) => {
    if (storeOfItem !== null && newItemName && indexOfItem !== null){
        setShoppingList(prevShoppingList => {
            const updatedShoppingList = { ...prevShoppingList };
            updatedShoppingList[storeOfItem][indexOfItem] = newItemName;
            return (updatedShoppingList);
        });

        setStoreOfItem(null);
        setIndexOfItem(null);
        setNewItemName("");
    }
};
