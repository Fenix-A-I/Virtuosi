import {pool} from '../db.js';

// Adds a completely new instance for a new day (called from the interval)
const deleteHistory = async (req,res) => {
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

        const result = await pool.query("DELETE FROM history WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4 RETURNING *",
            [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
        );
        console.log("Deleted from History!");
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error deleting habits:", err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export { deleteHistory };