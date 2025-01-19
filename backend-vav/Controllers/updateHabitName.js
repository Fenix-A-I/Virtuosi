import {pool} from '../db.js';

const updateHabitName = async (req,res) => {
    try {
        const {habitName, newHabitName} = req.body;
        if (!habitName || !newHabitName) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }
        const result = await pool.query("UPDATE virtues SET habitName=$1 WHERE habitName=$2 RETURNING *",
            [newHabitName, habitName]
        );
        console.log("Updated Habit!");
        return res.status(200).json(result.rows[0]);
    } catch(err) {
        console.error("Error updating habit:", err.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
export {updateHabitName};