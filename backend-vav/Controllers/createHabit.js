import { isUndefined } from 'util';
import { pool } from '../db.js';

const createHabit = async(req,res) => {
    try {
        const {habitName,
            habitIsVirtue,
            habitDescription,
            habitTrackingType,
            habitNumericalTarget,       //Used for count and time-interval targets
            habitTimeTarget,
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
        
        const newHabitDesc = habitDescription === undefined ? "" : habitDescription;
        const newHabitNumericalTarget = habitNumericalTarget === undefined ? null : habitNumericalTarget;
        const  newHabitTimeTarget = habitTimeTarget === undefined ? null : habitTimeTarget;
        const newGoalDaycountCount = goalDaycountCount === undefined ? null : goalDaycountCount;
        const newGoalDaycountPeriod = goalDaycountPeriod === undefined ? null: goalDaycountPeriod;
        const newGoalDayWeekdaysDays = goalDayWeekdaysDays === undefined ? null: goalDayWeekdaysDays;
        const newGoalStreakCheat = goalStreakCheat === undefined ? null: goalStreakCheat;
        const newGoalStreakSkipDays = goalStreakSkipDays === undefined ? null: goalStreakSkipDays;
        const newGoalStreakFreezesAccumulation = goalStreakFreezesAccumulation === undefined ? null: goalStreakFreezesAccumulation;

        //console.log(habitName,habitIsVirtue,newHabitDesc,habitTrackingType,goalDayRequirement,newGoalDaycountCount,newGoalDaycountPeriod,
        //    newGoalDayWeekdaysDays,newGoalStreakCheat,newGoalStreakSkipDays,newGoalStreakFreezesAccumulation);
        // Are vals set to undefined?
        const result = await pool.query("INSERT INTO virtues VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",    //use pgp
            [
                habitName,habitIsVirtue,newHabitDesc,habitTrackingType,goalDayRequirement,newHabitNumericalTarget,newHabitTimeTarget,
                newGoalDaycountCount,newGoalDaycountPeriod,newGoalDayWeekdaysDays,newGoalStreakCheat,newGoalStreakSkipDays,
                newGoalStreakFreezesAccumulation
            ]
        );
        console.log("Created Habit!");
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating habit", err.message);
        res.status(500).json({ err:"Internal Server Error"});
    }
}

const updateVirtue = async (req, res) => {
  try {
    // Get most recent value
    const yesterdayRes = await pool.query("SELECT * FROM history WHERE dayRecorded=(SELECT CURRENT_DATE - 1)");
    console.log(yesterdayRes.rows);
    // Update (completed) if yesterday's history it exists
    if (!yesterdayRes.rows.length==0) {
        //For numerical/time values
        for (let i=0;i<yesterdayRes.rows.length;i++) {
            console.log("Row:", i);
            // Ensure whether completed==True
            if (yesterdayRes.rows[i].habittrackingtype=="numerical" || yesterdayRes.rows[i].habittrackingtype=="time") {
                const virtueRes = await pool.query("SELECT * FROM virtues WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4",
                    [
                        yesterdayRes.rows[i].habitname,
                        yesterdayRes.rows[i].habitisvirtue,
                        yesterdayRes.rows[i].habittrackingtype,
                        yesterdayRes.rows[i].goaldayrequirement
                    ]
                );
                // Conditionally set completed==True
                console.log("Target: ", virtueRes.rows[0].habitnumericaltarget);
                if (yesterdayRes.rows[i].count>=virtueRes.rows[0].habitnumericaltarget) {
                    await pool.query("UPDATE history SET completed=TRUE WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4",
                        [
                            yesterdayRes.rows[i].habitname,
                            yesterdayRes.rows[i].habitisvirtue,
                            yesterdayRes.rows[i].habittrackingtype,
                            yesterdayRes.rows[i].goaldayrequirement
                        ]
                    );
                }
                // Update Streak Value (Streak Freezes not implemented)
            }
            // Increment Streak for these values with history
            let streakNum = yesterdayRes.rows[i].streaknum;
            console.log(streakNum);
            await pool.query("UPDATE history SET streakNum=$1 WHERE completed=TRUE AND dayRecorded=(SELECT CURRENT_DATE - 1)",
                [streakNum+1]
            );
        
            // Bool and time-limit values just set completed=TRUE when changed
            // Add next historical value
            const todayRes = await pool.query("INSERT INTO history VALUES ($1,$2,$3,$4,0,FALSE,0,(SELECT CURRENT_DATE))",
                [
                    yesterdayRes.rows[i].habitname,
                    yesterdayRes.rows[i].habitisvirtue,
                    yesterdayRes.rows[i].habittrackingtype,
                    yesterdayRes.rows[i].goaldayrequirement
                ]
            );
        }
        // Set reset broken streaks
        await pool.query("UPDATE history SET streakNum=0 WHERE completed=FALSE AND dayRecorded=(SELECT CURRENT_DATE - 1)");
        return res.status(200).json({ message:"Data added to table!"})
    }
    return res.status(200).json({ message:"No Data from yesterday to update" });
    
    // Calculate streak for next ____
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