import { openDataBase } from "@/lib/db";

export const setUpStoresTable = async () => {
    try {
        const db = await openDataBase(); // Open the database asynchronously
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
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