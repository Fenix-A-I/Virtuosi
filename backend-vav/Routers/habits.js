import express from 'express';
import { createHabit,updateVirtue,updateDayStreaks } from '../Controllers/createHabit.js';
import { deleteHabit } from '../Controllers/deleteHabit.js';
import { getHabit } from '../Controllers/gethabit.js';
import { getHabits } from '../Controllers/getHabits.js';
import { updateHabit } from '../Controllers/updateHabit.js';
import { updateHabitName } from '../Controllers/updateHabitName.js';

import { getHistory } from '../Controllers/getHistory.js';
import { addHistory } from '../Controllers/addHistory.js';
import { deleteHistory } from '../Controllers/deleteHistory.js';
import { changeHistory } from '../Controllers/changeHistory.js';

const router = express.Router();

router.post('/create-new-habit', createHabit);     // createHabit will be a function in the Controllers directory

//For the virtues table
router.delete('/delete-habit', deleteHabit);
router.get('/get-habit', getHabit);
router.get('/get-habits-list', getHabits);
router.put('/update-habit', updateHabit);
router.put('/update-habit-name', updateHabitName);

//For the histroy table
router.get('/get-history', getHistory);
router.post('/add-history', addHistory);
router.delete('/delete-history', deleteHistory);
router.put('/change-history', changeHistory);
router.put('/update-virtue', updateVirtue);
router.put('/updateDayStreaks', updateDayStreaks);

/*
router.post('/goalday', goalday);
router.put('/update-goal', updateGoal);
router.put('/update-streak', updateStreak);*/       //Will uncomment once functions are created


export default router;