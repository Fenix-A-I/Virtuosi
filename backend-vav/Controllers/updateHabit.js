import {pool} from '../db.js';

const updateHabit = async (req,res) => {
    try {
        const {
            habitName,
            habitIsVirtue,
            habitDescription,
            habitTrackingType,
            goalDayRequirement,
            habitNumericalTarget,
            habitTimeTarget,
            goalDaycountCount,
            goalDaycountPeriod,
            goalDayWeekdaysDays,
            goalStreakCheat,
            goalStreakSkipDays,
            goalStreakFreezesAccumulation} = req.body;
        if (!habitName || !habitIsVirtue || !habitTrackingType || !goalDayRequirement) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }

        // Changing Count/Time
        if (habitNumericalTarget && !habitTimeTarget) {
            const result = await pool.query(
                "UPDATE virtues SET habitNumericalTarget=$1 WHERE habitname=$2 AND habitIsVirtue=$3 AND habitTrackingType=$4 AND goalDayRequirement=$5 RETURNING *",
                [habitNumericalTarget,habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            console.log("Changed Count/Time!")
            return res.status(200).json(result.rows[0]);
        } 

        // Changing Time LIMIT
        if (!habitNumericalTarget && habitTimeTarget) {
            const result = await pool.query(
                "UPDATE virtues SET habitTimeTarget=$1 WHERE habitname=$2 AND habitIsVirtue=$3 AND habitTrackingType=$4 AND goalDayRequirement=$5 RETURNING *",
                [habitTimeTarget,habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            console.log("Changed Time Limit!");
            return res.status(200).json(result.rows[0]);
        }} catch (err) {
            console.error("Error updating habit requirements:", err.message);
            return res.status(500).json({error:"Internal Server Error"});
        }
    };

export { updateHabit };