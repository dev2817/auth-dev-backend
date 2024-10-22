import express from 'express';
import authMiddleware from '../middlewares/verifyToken.ts';
import checkPermission from '../middlewares/checkPermission.ts';
import superAdminController from '../controllers/superAdmin.controller.ts';

const router = express.Router();

router.route('/getUsers').get(authMiddleware, checkPermission({ requiredPermission: "manage_admins" }), superAdminController.getUsers);

router.route('/getRoles').get(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), superAdminController.getAllRoles);

router.route('/getProjects').get(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), superAdminController.getAllProjects);

router.route('/getPermissions').get(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), superAdminController.getAllPermissions);

export default router;
