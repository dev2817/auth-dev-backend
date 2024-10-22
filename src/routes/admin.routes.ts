import express from 'express';

import authMiddleware from '../middlewares/verifyToken.ts';
import checkPermission from '../middlewares/checkPermission.ts';
import validationSchema from '../validations/validations.ts';
import validate from '../middlewares/apiValidator.ts';
import adminController from '../controllers/admin.controller.ts';

const router = express.Router();

//user routes

router.route('/getUsers').get(authMiddleware, checkPermission({ requiredPermission: "manage_users" }), adminController.getUsers);



// project routes

router.route('/createProject').post(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), validate(validationSchema.createProjectValidation), adminController.addProject);

router.route('/getProjects').get(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), adminController.getAllProjects);

router.route('/getProjectById/:projectId').get(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), validate(validationSchema.getProjectByIdValidation), adminController.getProjectDataById);

router.route('/getProjectsByIds').post(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), validate(validationSchema.getProjectsByIdsValidation), adminController.getProjectDataByIds);

router.route('/updateProject/:projectId').put(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), validate(validationSchema.updateProjectValidation), adminController.updateProjectData);

router.route('/deleteProject/:projectId').delete(authMiddleware, checkPermission({ requiredPermission: "manage_projects" }), validate(validationSchema.deleteProjectValidation), adminController.deleteProjectData);



// permission Routes
router.route('/createPermission').post(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), validate(validationSchema.createPermissionValidation), adminController.addPermission);

router.route('/getPermissions').get(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), adminController.getAllPermissions);

router.route('/getPermissionById/:permissionId').get(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), validate(validationSchema.getPermissionByIdValidation), adminController.getPermissionDataById);

router.route('/getPermissionsByIds').post(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), validate(validationSchema.getPermissionsByIdsValidation), adminController.getPermissionDataByIds);

router.route('/updatePermission/:permissionId').put(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), validate(validationSchema.updatePermissionValidation), adminController.updatePermissionData);

router.route('/deletePermission/:permissionId').delete(authMiddleware, checkPermission({ requiredPermission: "manage_permissions" }), validate(validationSchema.deletePermissionValidation), adminController.deletePermissionData);



// role routes
router.route('/createRole').post(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), validate(validationSchema.createRoleValidation), adminController.addRole);

router.route('/getRoles').get(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), adminController.getAllRoles);

router.route('/getRoleById/:roleId').get(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), validate(validationSchema.getRoleByIdValidation), adminController.getRoleByIdData);

router.route('/getRolesByIds').post(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), validate(validationSchema.getRolesByIdsValidation), adminController.getRolesByIdsData);

router.route('/updateRole/:roleId').put(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), validate(validationSchema.updateRoleValidation), adminController.updateRoleData);

router.route('/deleteRole/:roleId').delete(authMiddleware, checkPermission({ requiredPermission: "manage_roles" }), validate(validationSchema.deleteRoleValidation), adminController.deleteRoleData);

export default router;
