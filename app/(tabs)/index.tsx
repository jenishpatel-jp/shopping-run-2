import React from 'react'
import Items from '../../components/Items/Items'
import Lists from '../../components/Lists/Lists';
import Store from '../../components/Items/Store/Store';
import ResetButton from '../../components/Buttons/resetButton';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { openDatabase } from '@/lib/db';
import { setUpStoresTable, getStores } from '@/models/Store';
import { setUpItemsTable, addItem } from '@/models/Items';

export default function ShoppingRun(){

  const [newItemName, setNewItemName] = useState<string>("");
  const [stores, setStores] = useState<{ storeId: number; storeName: string }[]>([]);

  interface ListItem {
    key: string, 
    component: JSX.Element
  }

  const data: ListItem[] = [
    { key: 'store', component:
      <Store />
    },
    { key: 'items', component:
      <Items 
        stores={stores}
      />
    },
    { key: 'lists', component:
      <Lists 
        newItemName={newItemName}
        setNewItemName={setNewItemName}
      />
    },
    {key: 'reset', component:
      <ResetButton
        reset={() => console.log('Reset the button')}
      />
    } 
  ];
  
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <View style={styles.itemContainer} >
      {item.component}
    </View>
  );

  useEffect(() => {
    openDatabase();
    setUpStoresTable();
    setUpItemsTable();
  }, []);

  useEffect(() => {
    const fetchStores = async() => {
        try {
            const allStores = await getStores();
            setStores(allStores);
        }catch(error){
            console.error('Error fetching stores:', error)
        }
    };
    fetchStores();
}, [stores]);

  //possibly use getAllAsync or something similar to get the stores from the database. 

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
