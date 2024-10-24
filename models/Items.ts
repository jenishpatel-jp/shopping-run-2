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

export const editItem = async () => {
    try {

    } catch (error){

    }
};

export const deleteItem = async () => {
    try {

    } catch (error){

    }
};

export const deleteAllItems = async () => {
    try {

    } catch (error){

    }
};