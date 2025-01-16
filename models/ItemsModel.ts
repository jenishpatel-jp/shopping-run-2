import { openDatabase } from "@/lib/db";

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
export const addItem = async (storeId: number, itemName: string, completed: number = 0, callback?: ()=> void) => {
    try {
        const db = await openDatabase(); //open the database

        const result = await db.runAsync(
            'INSERT INTO items (storeId, itemName, completed) VALUES (?, ?, ?);',
            [storeId, itemName, completed]
        );

        console.log(`New item added with item name: ${itemName} and item ID: ${result.lastInsertRowId}`);

        if (callback)callback(); 

    } catch (error){
        console.error('Error adding item:', error);
    }
};

// Edit item in the database
export const editItem = async (itemId: number, itemName: string, callback?: () => void) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'UPDATE items SET itemName = ? WHERE itemId = ?',
            [itemName, itemId]
        );

        if (result.changes > 0){
            console.log(`Item with ID ${itemId} was successfully updated to ${itemName}`)
        } else {
            console.log(`No item found with ID ${itemId} to update`)
        }

        if (callback) callback();
    } catch (error){
        console.error('Error editing item:', error);
    }
};

// Delete the item in the database 
export const deleteItem = async (itemId: number, callback?: ()=> void) => {
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

        if (callback) callback();
    } catch (error){
        console.error('Error deleting the item', error);
    }
};

//Delete all the items in the database
export const deleteAllItems = async (callback?: ()=> void) => {
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

        if(callback) callback();

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
        console.log('All items:', allRows);
        return allRows;
    } catch (error){
        console.error('Error getting the item', error);
        return [];
    }
}

export const getStoresWithIncompleteItems = async() => {

    try {
        const db = await openDatabase();

        const query = `
            SELECT 
                stores.storeName,
                items.itemName,
                items.itemId
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

        // Transform the result into the desired output format
        const result: Record<string, [number, string] []> = {};

        rows.forEach((row: any) => {
            const storeName = row.storeName;
            const itemName = row.itemName;
            const itemId = row.itemId;

            if (!result[storeName]){
                result[storeName] = [];
            }

            if (itemName !== null){ 
                result[storeName].push([itemId, itemName]);
            }

        });
        console.log('Stores with incomplete items:', result);
        return result;

        
    } catch(error){
        console.error('Error getting items for each store:', error);
        return {};
    }
};

// Fetch the completed items for a store
export const getCompletedItemsFromStores = async () => {
    try {
        const db = await openDatabase();

        const query = `
            SELECT 
                items.itemName
            FROM 
                items
            WHERE 
                items.completed = 1
        `;

        const rows = await db.getAllAsync(query);

        // Transform the result into the desired output format
        const result: string[] = [];

        rows.forEach((row: any) => {
            const itemName = row.itemName;
            result.push(itemName);
        });
        console.log('Completed items:', result);
        return result;
    } catch (error){
        console.error('Error getting completed items for store:', error);
        return [];
    }
};