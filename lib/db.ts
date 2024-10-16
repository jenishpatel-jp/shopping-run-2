import * as SQLite from 'expo-sqlite';

// Async function to open or create the database.

export const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('shopping_run.db');
        console.log('Database opened successfully');
        return db;
    } catch (error){
        console.error('Error opening database:', error);
        throw error;
    }
}
