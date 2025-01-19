import { isUndefined } from 'util';
import { pool } from '../db.js';

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
        
        const newHabitDesc = habitDescription === undefined ? "a" : habitDescription;
        const newGoalDaycountCount = goalDaycountCount === undefined ? null : goalDaycountCount;
        const newGoalDaycountPeriod = goalDaycountPeriod === undefined ? null: goalDaycountPeriod;
        const newGoalDayWeekdaysDays = goalDayWeekdaysDays === undefined ? null: goalDayWeekdaysDays;
        const newGoalStreakCheat = goalStreakCheat === undefined ? null: goalStreakCheat;
        const newGoalStreakSkipDays = goalStreakSkipDays === undefined ? null: goalStreakSkipDays;
        const newGoalStreakFreezesAccumulation = goalStreakFreezesAccumulation === undefined ? null: goalStreakFreezesAccumulation;

        //console.log(habitName,habitIsVirtue,newHabitDesc,habitTrackingType,goalDayRequirement,newGoalDaycountCount,newGoalDaycountPeriod,
        //    newGoalDayWeekdaysDays,newGoalStreakCheat,newGoalStreakSkipDays,newGoalStreakFreezesAccumulation);
        // Are vals set to undefined?
        const result = await pool.query("INSERT INTO virtues VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",    //use pgp
            [
                habitName,habitIsVirtue,newHabitDesc,habitTrackingType,goalDayRequirement,newGoalDaycountCount,newGoalDaycountPeriod,
                newGoalDayWeekdaysDays,newGoalStreakCheat,newGoalStreakSkipDays,newGoalStreakFreezesAccumulation
            ]
        );
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating habit", err.message);
        res.status(500).json({ err:"Internal Server Error"});
    }
}

const updateVirtue = async (habitName, newDescription) => {
  try {
    await db.none('UPDATE virtues SET habitDescription = $1 WHERE habitName = $2', [newDescription, habitName]);
    console.log('Value updated successfully');
  } catch (error) {
    console.log('ERROR:', error);
  }
};

const updateDayStreaks = async () => {
  try {
    await db.none('UPDATE virtues SET cur_streak = cur_streak + 1 WHERE habitIsVirtue = true');
    console.log('Day streaks updated successfully');
  } catch (error) {
    console.log('ERROR:', error);
  }
};

export {createHabit,updateVirtue,updateDayStreaks};