import {pool} from '../db.js';

const updateHabit = async (req,res) => {
    try {
        const {
            habitName,
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

        //if (goalDaycountCount && !goalDaycountPeriod) {
        //    continue;
        //} 
        } catch (err) {
            return;
        }
    };