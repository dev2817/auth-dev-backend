import express from 'express';
import { forgotPasswordData, getUserById, logInUser, otpVerifyData, resendOtp, resetPasswordData, signUpUser, updateUser } from '../controllers/user.controller.ts';

const router = express.Router();

router.route('/signUp').post(signUpUser);

router.route('/signIn').post(logInUser);

router.route('/resendOtp').post(resendOtp);

router.route('/forgotPassword').post(forgotPasswordData);

router.route('/otpVerify').post(otpVerifyData);

router.route('/resetPassword').post(resetPasswordData);

router.route('/updateUser/:userId').put(updateUser);

router.route('/getUserById/:userId').get(getUserById);


export default router;
