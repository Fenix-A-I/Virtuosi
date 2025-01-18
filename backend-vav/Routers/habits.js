import express from 'express';
const router = express.Router();

router.post('/create-new-habit', createHabit);     // createHabit will be a function in the Controllers directory

export default router;