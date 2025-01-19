import {pool} from '../db.js';

const getHabits = async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM virtues");
        console.log("Retrieved Habit!");
        return res.status(200).json(result.rows);
    } catch(err) {
        console.error("Error retrieving habit:", err.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
export {getHabits};