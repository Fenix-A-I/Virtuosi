import {pool} from '../db.js';

// Adds a completely new instance for a new day (called from the interval)
const addHistory = async (req,res) => {
    try {
        const {
            habitName,
            habitIsVirtue,
            habitTrackingType,
            goalDayRequirement,
            } = req.body;
        if (!habitName || !habitIsVirtue || !habitTrackingType || !goalDayRequirement) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }

        await pool.query("INSERT INTO history VALUES ($1,$2,$3,$4,0,FALSE,0.0,(SELECT CURRENT_DATE)) RETURNING *",
            [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
        );
        console.log("Added to History!");
        return res.status(200).json({message:"Sucessfully added to history!"});
    } catch (err) {
        console.error("Error updating habit requirements:", err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export { addHistory };