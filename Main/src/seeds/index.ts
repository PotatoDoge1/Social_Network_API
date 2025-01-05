import db from '../config/connection.js';
import cleanDB from './cleanDB';

try {
    await db();
    await cleanDB();
} catch (error) {
    console.log('Error cleaning the database.');
    process.exit(1);
}