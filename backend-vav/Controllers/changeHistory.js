import {pool} from '../db.js';

// Adds a completely new instance for a new day (called from the interval)
const changeHistory = async (req,res) => {
    try {
        const {
            habitName,
            habitIsVirtue,
            habitTrackingType,
            goalDayRequirement,
            discreteChange,
            boolChange,
            
            } = req.body;
        if (!habitName || !habitIsVirtue || !habitTrackingType || !goalDayRequirement) {
            return res.status(400).json({ error : "Missing Required Fields"});
        }

        if (habitTrackingType=="time" || habitTrackingType=="numerical") {
            if (!discreteChange) {
                return res.status(400).json({error:"discreteChange attribute needed in body"});
            }
            let count = await pool.query("SELECT count FROM history WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4",
                [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            let data = count.rows[0].count;
            console.log(data);
            data += discreteChange;
            //Update Discrete Data
            const result = await pool.query("UPDATE history SET count=$1 WHERE habitName=$2 AND habitIsVirtue=$3 AND habitTrackingType=$4 AND goalDayRequirement=$5 RETURNING *",
                [data,habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            //If Discrete Data goes over, make completed==True
            let targetres = await pool.query("SELECT habitNumericalTarget FROM virtues WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4",
                [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            //Set is_completed if it is
            let targetnumber = targetres.rows[0].habitnumericaltarget;
            if (data >= targetnumber) {
                let result2 = await pool.query("UPDATE history SET completed=TRUE WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4 RETURNING *",
                    [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
                );
                return res.status(200).json(result2.rows);
            }
            //Else set not_completed
            else {
                let result2 = await pool.query("UPDATE history SET completed=FALSE WHERE habitName=$1 AND habitIsVirtue=$2 AND habitTrackingType=$3 AND goalDayRequirement=$4 RETURNING *",
                    [habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
                );
                return res.status(200).json(result2.rows);
            }
        }   
        if (habitTrackingType=="boolean") {
            if (!boolChange) {
                return res.status(400).json({error:"boolChange attribute needed in body"});
            }
            const result = await pool.query("UPDATE history SET completed=$1 WHERE habitName=$2 AND habitIsVirtue=$3 AND habitTrackingType=$4 AND goalDayRequirement=$5 RETURNING *",
                [boolChange,habitName,habitIsVirtue,habitTrackingType,goalDayRequirement]
            );
            return res.status(200).json(result.rows);
        }
        return res.status(400).json({error:"Some parameters were forgotten"});
    } catch (err) {
        console.error("Error updating history:", err.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export { changeHistory };