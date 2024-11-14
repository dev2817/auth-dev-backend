import express from 'express';
import authMiddleware from '../middlewares/verifyToken.ts';
import validate from '../middlewares/apiValidator.ts';
import validationSchema from '../validations/validations.ts';
import userController from '../controllers/user.controller.ts';

const router = express.Router();

router.route('/checkToken').get(userController.checkToken)

router.route('/signUp').post(validate(validationSchema.signUpValidation), userController.signUpUser);

router.route('/signIn').post(validate(validationSchema.logInValidation), userController.logInUser);

router.route('/resendOtp').post(validate(validationSchema.resendOtpValidation), userController.resendOtp);

router.route('/forgotPassword').post(validate(validationSchema.forgotPasswordValidation), userController.forgotPasswordData);

router.route('/otpVerify').post(validate(validationSchema.otpVerifyValidation), userController.otpVerifyData);

router.route('/checkUserData').post(validate(validationSchema.checkUserDataValidation), userController.checkUserData);

router.route('/signWithGoogle').post(validate(validationSchema.googleSignInValidation), userController.signWithGoogle);

router.route('/completeProfile').post(validate(validationSchema.completeProfileValidation), userController.completeProfileData);

router.route('/resetPassword').post(validate(validationSchema.resetPasswordValidation), userController.resetPasswordData);

router.route('/updateUser/:userId').put(validate(validationSchema.updateUserValidation), authMiddleware, userController.updateUser);

router.route('/getUserById/:userId').get(validate(validationSchema.getUserByIdValidation), authMiddleware, userController.getUserById);


export default router;
