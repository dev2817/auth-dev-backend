import express from 'express';
import { signUpUser, updateUser } from '../controllers/user.controller.ts';

const router = express.Router();

router.route('/signUp').post(signUpUser);

router.route('/updateUser/:userId').put(updateUser);

export default router;
