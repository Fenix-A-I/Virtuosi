import express from 'express';
const router = express.Router();

router.post('/create-new-habit', createHabit);     // createHabit will be a function in the Controllers directory
router.delete('/delete-habit', deleteHabit);
router.put('/update-habit', updateHabit);
router.get('/get-habit', getHabit);
router.get('/get-habits-list', getHabits);
router.put('/update-habit-name', updateHabitName);

router.post('/goalday', goalday);
router.put('/update-goal', updateGoal);
router.put('/update-streak', updateStreak);


export default router;