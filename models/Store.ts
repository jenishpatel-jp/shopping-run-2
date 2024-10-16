import { openDataBase } from "@/lib/db";

export const setUpStoresTable = async () => {
    try {
        const db = await openDataBase(); // Open the database asynchronously
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT
            name TEXT NOT NULL
            )
            
            `);
            console.log('Stores table created successfully');
    } catch (error) {
        console.error('Error creating stores tables:', error);

    }
}