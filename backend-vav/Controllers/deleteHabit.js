import {pool} from '../db.js';

const deleteHabit = async (req,res) => {
    try {
        const {habitName,
            habitIsVirtue,
            habitDescription,
            habitTrackingType,
            goalDayRequirement,
            goalDaycountCount,
            goalDaycountPeriod,
            goalDayWeekdaysDays,
            goalStreakCheat,
            goalStreakSkipDays,
            goalStreakFreezesAccumulation} = req.body;
        if (!habitName || !habitIsVirtue || !habitTrackingType || !goalDayRequirement) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }
        const result = await pool.query("DELETE FROM virtues WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4 RETURNING *",
            [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
        );
        console.log("Deleted Habit!");
        return res.status(200).json(result.rows[0]);
    } catch(err) {
        console.error("Error deleting habit:", err.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
}


export {deleteHabit};