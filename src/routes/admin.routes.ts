import express from 'express';
import { addPermission, addProject, addRole, deletePermissionData, deleteProjectData, deleteRoleData, getAllPermissions, getAllProjects, getAllRoles, getPermissionDataById, getPermissionDataByIds, getProjectDataById, getProjectDataByIds, getRoleByIdData, getRolesByIdsData, getUsers, updatePermissionData, updateProjectData, updateRoleData } from '../controllers/admin.controller.ts';

const router = express.Router();

//user routes

router.route('/getUsers').get(getUsers);



// project routes

router.route('/createProject').post(addProject);

router.route('/getProjects').get(getAllProjects);

router.route('/getProjectById/:projectId').get(getProjectDataById);

router.route('/getProjectsByIds').post(getProjectDataByIds);

router.route('/updateProject/:projectId').put(updateProjectData);

router.route('/deleteProject/:projectId').delete(deleteProjectData);



// permission Routes
router.route('/createPermission').post(addPermission);

router.route('/getPermissions').get(getAllPermissions);

router.route('/getPermissionById/:permissionId').get(getPermissionDataById);

router.route('/getPermissionsByIds').post(getPermissionDataByIds);

router.route('/updatePermission/:permissionId').put(updatePermissionData);

router.route('/deletePermission/:permissionId').delete(deletePermissionData);



// role routes
router.route('/createRole').post(addRole);

router.route('/getRoles').get(getAllRoles);

router.route('/getRoleById/:roleId').get(getRoleByIdData);

router.route('/getRolesByIds').post(getRolesByIdsData);

router.route('/updateRole/:roleId').put(updateRoleData);

router.route('/deleteRole/:roleId').delete(deleteRoleData);

export default router;
