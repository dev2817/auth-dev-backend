import express from 'express';
import { getAllPermissions, getAllProjects, getAllRoles, getUsers } from '../controllers/superAdmin.controller.ts';

const router = express.Router();

router.route('/getUsers').get(getUsers);

router.route('/getRoles').get(getAllRoles);

router.route('/getProjects').get(getAllProjects);

router.route('/getPermissions').get(getAllPermissions);

export default router;
