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
        // Are vals set to undefined?
        const result = pool.query("INSERT INTO virtues VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
            [habitIsVirtue,habitDescription,habitTrackingType,goalDayRequirement,]
        );
    } catch (err) {
        
    }
}