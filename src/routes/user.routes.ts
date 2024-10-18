import express from 'express';
import { forgotPasswordData, otpVerifyData, resendOtp, resetPasswordData, signUpUser, updateUser } from '../controllers/user.controller.ts';

const router = express.Router();

router.route('/signUp').post(signUpUser);

router.route('/resendOtp').post(resendOtp);

router.route('/forgotPassword').post(forgotPasswordData);

router.route('/otpVerify').post(otpVerifyData);

router.route('/resetPassword').post(resetPasswordData);

router.route('/updateUser/:userId').put(updateUser);

export default router;
