import { openDatabase } from "@/lib/db";
import { store } from "expo-router/build/global-state/router-store";

export const setUpItemsTable = async () => {
    try {
        const db = await openDatabase(); // Open the database

        // Set journal mode to WAL
        await db.execAsync('PRAGMA journal_mode = WAL;')

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS items (
            itemId INTEGER PRIMARY KEY AUTOINCREMENT,
            storeId INTEGER NOT NULL,
            itemName TEXT NOT NULL,
            completed INTEGER DEFAULT 0, -- Use INTEGER for boolean values (0 = false, 1 = true)
            FOREIGN KEY (storeId) REFERENCES stores (storeId) ON DELETE CASCADE
            );
            `);
            // ON DELETE CASCADE ensures that when a store is deleted, all related items are automatically removed. 
        console.log('Items table created successfully');
    } catch (error) {
        console.error('Error creating items tables:', error);
    }
};

// Add a new item to the items database
export const addItem = async (storeId: number, itemName: string, completed: number = 0) => {
    try {
        const db = await openDatabase(); //open the database

        const result = await db.runAsync(
            'INSERT INTO items (storeId, itemName, completed) VALUES (?, ?, ?);',
            [storeId, itemName, completed]
        );

        console.log(`Item added successfully with ID: ${result.lastInsertRowId, result.changes}`)

    } catch (error){
        console.error('Error adding item:', error);
    }
};

// Edit item in the database
export const editItem = async (itemId: number, itemName: string) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'UPDATE items SET itemName = ? WHERE itemId = ?',
            [itemName, itemId]
        );

        if (result.changes > 0){
            console.log(`Item with ID ${itemId} was successfully updated`)
        } else {
            console.log(`No item found with ID ${itemId} to update`)
        }
    } catch (error){
        console.error('Error editing item:', error);
    }
};

// Delete the item in the database 
export const deleteItem = async (itemId: number) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'DELETE FROM items WHERE itemId = ?',
            [itemId]
        );

        if (result.changes > 0){
            console.log(`Item with ID ${itemId} was successfully deleted`)
        } else {
            console.log(`No item found with ${itemId} to delete.`)
        }
    } catch (error){
        console.error('Error deleting the item', error);
    }
};

//Delete all the items in the database
export const deleteAllItems = async () => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'DELETE FROM items',
        )

        if (result.changes > 0){
            console.log('All the items have been deleted')
        } else {
            console.log('Error deleting all the items')
        }

    } catch (error){
        console.error('Error deleting all the items', error);
    }
};


//Get the items from the Database

type ItemRow = {
    itemId : number; 
    storeId: number;
    itemName: string;
    completed: number;
}

export const getItems = async ()=> {
    try {
        const db = await openDatabase();
        const allRows: ItemRow[] = await db.getAllAsync('SELECT * FROM items');
        return allRows;
    } catch (error){
        console.error('Error getting the item', error);
        return [];
    }
}


// Get the incomplete items for each Store

type StoreWithItems = {
    storeName: string;
    items: string[];
}

export const getStoresWithIncompleteItems = async() => {
    try {
        const db = await openDatabase();

        const query = `
            SELECT 
                stores.storeName,
                items.itemName
            FROM 
                stores
            LEFT JOIN
                items
            ON
                stores.storeId = items.storeId
            WHERE 
                items.completed = 0
        `;

        const rows = await db.getAllAsync(query);

        // Transfor the result into the desired output format
        const result: Record<string, string[]> = {};

        rows.forEach((row: any) => {
            const storeName = row.storeName;
            const itemName = row.itemName;

            if (!result[storeName]){
                result[storeName] = [];
            }

            if (itemName) {
                result[storeName].push(itemName);
            }
        });

        return result;

        
    } catch(error){
        console.error('Error getting items for Stores with Incomplete items');
        return {};
    }
}