import {pool} from '../db.js';

const getHabit = async (req,res) => {
    try {
        const {habitName} = req.body;
        if (!habitName) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }
        const result = await pool.query("SELECT * FROM virtues WHERE habitName=$1",
            [habitName]
        );
        console.log("Retrieved Habit!");
        console.log(result.rows);
        return res.status(200).json({ data:result.rows});
    } catch(err) {
        console.error("Error retrieving habit:", err.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export {getHabit};