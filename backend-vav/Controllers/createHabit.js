import pool from '../db.js';

const createHabit = async(req,res) => {
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
        console.log(goalStreakFreezesAccumulation);

        // Are vals set to undefined?
        const result = pool.query("INSERT INTO virtues VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",    //use pgp
            [
                habitIsVirtue,habitDescription,habitTrackingType,goalDayRequirement,goalDaycountCount,goalDaycountPeriod,
                goalDayWeekdaysDays,goalStreakCheat,goalStreakSkipDays,goalStreakFreezesAccumulation
            ]
        );
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating habit", err.message);
        res.status(500).json({ err:"Internal Server Error"});
    }
}