import React from 'react'
import Items from '../../components/Items/Items'
import Lists from '../../components/Lists/Lists';
import Store from '../../components/Store/Store';
import ResetButton from '../../components/Buttons/resetButton';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { addStore, editStore, updateStoreName, deleteStore, deleteStoreIfNoItems } from '../../utils/storeUtils';
import { addItem, deleteItem, editItem, updateItemName } from '../../utils/itemsUtils';
import { reset } from '../../utils/resetButtonUtils';

export default function ShoppingRun(){

  const [storeList, setStoreList] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<{[key:string]: string[]}> ({});
  const [editingStoreIndex, setEditingStoreIndex] = useState<number | null>(null);
  const [newStoreName, setNewStoreName] = useState<string>('');
  const [newItemName, setNewItemName] = useState<string>("");
  const [storeOfItem, setStoreOfItem] = useState<string|null >("");
  const [indexOfItem, setIndexOfItem] = useState<number|null>(null);
  const [completedItem, setCompletedItem] = useState<string[]>([]);

  //useEffect to check if any of the shopping list keys has an empty array. If so, the key is deleted as it is no longer needed. 
  useEffect(() => {
    deleteStoreIfNoItems(shoppingList, setShoppingList)
  }, [shoppingList])

  interface ListItem {
    key: string, 
    component: JSX.Element
  }

  const data: ListItem[] = [
    { key: 'store', component:
      <Store 
        addStore={(storeName: string) => addStore(storeName, storeList, setStoreList)}
      />
    },
    { key: 'items', component:
      <Items
        storeList={storeList}
        addItem={(store: string, item: string) => addItem(store, item, setShoppingList)}
        editStore={(storeIndex: number) => editStore(storeIndex, storeList, setEditingStoreIndex, setNewStoreName)}
        deleteStore={(storeIndex: number) => deleteStore(storeIndex, storeList, setStoreList, setShoppingList)}
        updateStoreName={() => updateStoreName(editingStoreIndex, newStoreName, storeList, setStoreList, setShoppingList, setEditingStoreIndex, setNewStoreName)}
        editingStoreIndex={editingStoreIndex}
        newStoreName={newStoreName}
        setNewStoreName={setNewStoreName}
      />
    },
    { key: 'lists', component:
      <Lists 
        shoppingList={shoppingList} 
        deleteItem={(store: string, item: string) => deleteItem(store, item, setShoppingList)}
        updateItemName={() => updateItemName(storeOfItem, newItemName, indexOfItem, setShoppingList, setStoreOfItem, setIndexOfItem, setNewItemName)}
        editItem={(store: string, item: string) => editItem(store, item, shoppingList, setStoreOfItem, setIndexOfItem, setNewItemName)}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        indexOfItem={indexOfItem}
        storeOfItem={storeOfItem}
        completedItem={completedItem}
        setCompletedItem={setCompletedItem}
      />
    },
    {key: 'reset', component:
      <ResetButton
        reset={() => reset(setShoppingList, setStoreList, setCompletedItem)}
      />
    } 
  ];
  
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <View style={styles.itemContainer} >
      {item.component}
    </View>
  );

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#40146B',
      paddingTop: 50,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#F5A318',
    },
    itemContainer: {
      marginBottom: 20
    }
  });
