import {pool} from '../db.js';


const getHistory = async (req,res) => {
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

        const result = await pool.query("SELECT * FROM history WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4",
            [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
        );
        console.log("Got History");
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error updating habit requirements:", err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
};

export { getHistory };