import express from 'express';
import { signUpUser } from '../controllers/user.controller.ts';

const router = express.Router();

router.route('/getUsers').get((req, res) => {
    res.send({
        data: [],
        message: "Got all users successfully!",
        success: true
    })
});

router.route('/signUp').post(signUpUser);

export default router;
