import { openDatabase } from "@/lib/db";

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
}

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
}

export const editStore = async (storeName: string) => {
    try {
        const db = await openDatabase();

        const result = await db.runAsync(
            'UPDATE stores SET storeName = ? WHERE value = ?', [storeName]
        );
        console.log(`Store was successfuly updated with ID: ${result.changes}`)

    } catch (error){
        console.error('Error edditing store:', error)
    }
}