import { openDatabase } from "@/lib/db";

//Set up the store table
export const setUpStoresTable = async () => {
    try {
        const db = await openDatabase(); // Open the database asynchronously

        await db.execAsync('PRAGMA journal_mode = WAL;')

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS stores (
            storeId INTEGER PRIMARY KEY AUTOINCREMENT,
            storeName TEXT NOT NULL
            )
            `);
        console.log('Stores table created successfully');
    } catch (error) {
        console.error('Error creating stores tables:', error);
    }
};

// Add a new store to the database
export const addStore = async(storeName: string) => {
    try {
        const db = await openDatabase(); //open the database

        const result = await db.runAsync(
            'INSERT INTO stores (storeName) VALUES (?);', 
            [storeName]
        );

        console.log(`Store added successfully with ID: ${result.lastInsertRowId}, ${result.changes}`);

    } catch (error){
        console.error('Error adding store:', error)
    }
};

// Edit a store's name by its ID
export const editStore = async (storeId: number, storeName: string) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'UPDATE stores SET storeName = ? WHERE storeId = ?', 
            [storeName, storeId]
        );

        if (result.changes > 0){
            console.log(`Store with ID ${storeId} was successfully updated`);
        } else {
            console.log(`No store found with ID ${storeId} to update`)
        }
    } catch (error){
        console.error('Error edditing store:', error);
    }
};

// Delete a store by ID
export const deleteStore = async (storeId: number) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'DELETE FROM stores WHERE storeId = ?', 
            [storeId]
        );
        
        if (result.changes > 0) {
            console.log(`Store with ID ${storeId} was successfully deleted`);
        } else {
            console.log(`No store found with ID ${storeId} to delete.`);
        }
    } catch(error){
        console.error('Error deleting the store', error);
    }
};

// Get the stores from the Database

type StoreRow = {
    storeId: number;
    storeName: string;
};

export const getStores = async (): Promise<StoreRow[]> => {
    try {
        console.log('Opening database...')
        const db = await openDatabase();
        console.log('Database opened. Feching rows...')
        const allRows: StoreRow[] = await db.getAllAsync('SELECT * FROM stores');
        console.log('Fetched rows:', allRows);
        return allRows;
    } catch(error) {
        console.error('Error getting the stores', error);
        return [];
    }
}