import { openDataBase } from "@/lib/db";

export const setUpItemsTable = async () => {
    try {
        const db = await openDataBase(); // Open the database
        await db.execAsync(`
            CREATE TABLE IF NOT EXIST items (
            itemId INTEGER PRIMARY KEY AUTOINCREMENT,
            storeId INTEGER NOT NULL,
            itemName TEXT NOT NULL,
            completed BOOLEAN
            )
            `);
        console.log('Items table created successfully');
    } catch (error) {
        console.error('Error creating items tables:', error);
    }
}