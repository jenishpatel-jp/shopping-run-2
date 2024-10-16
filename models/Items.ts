import { openDataBase } from "@/lib/db";

export const setUpItemsTable = async () => {
    try {
        const db = await openDataBase(); // Open the database
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS items (
            itemId INTEGER PRIMARY KEY AUTOINCREMENT,
            storeId INTEGER NOT NULL,
            itemName TEXT NOT NULL,
            completed INTEGER DEFAULT 0, -- Use INTEGER for boolean values (0 = false, 1 = true)
            FOREIGN KEY (storeId) REFERENCES stores (id) ON DELETE CASCADE
            );
            `);
        console.log('Items table created successfully');
    } catch (error) {
        console.error('Error creating items tables:', error);
    }
}