import Joi from 'joi';

const message = {
    PROVIDE_INPUT: (field: string) => `Please provide a valid ${field}`,
    VALID_INPUT: (field: string) => `${field} must be valid`,
};

const signUpValidation = {
    body: Joi.object().keys({
        name: Joi.string().min(3).max(50).required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
        username: Joi.string().alphanum().min(3).max(30).required().messages({
            'any.required': message.PROVIDE_INPUT('username'),
        }),
        email: Joi.string().email().required().messages({
            'any.required': message.PROVIDE_INPUT('email'),
        }),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'any.required': message.PROVIDE_INPUT('mobile number'),
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': message.PROVIDE_INPUT('password'),
        }),
        roles: Joi.array().items(Joi.string().valid('admin', 'user')).min(1).required().messages({
            'any.required': 'At least one role must be specified',
        }),
        projectCode: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('project code'),
        }),
    }),
};

const logInValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': message.PROVIDE_INPUT('password'),
        }),
        ip: Joi.string().ip({ version: ['ipv4', 'ipv6'] }).required().messages({
            'any.required': message.PROVIDE_INPUT('IP address'),
        }),
        projectCode: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('project code'),
        }),
    }),
};

const resendOtpValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
    }),
};

const forgotPasswordValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
    }),
};

const otpVerifyValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
        otp: Joi.string().length(6).required().messages({
            'any.required': message.PROVIDE_INPUT('OTP'),
        }),
        ip: Joi.string().ip({ version: ['ipv4', 'ipv6'] }).required().messages({
            'any.required': message.PROVIDE_INPUT('IP address'),
        }),
        projectCode: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('project code'),
        }),
    }),
};

const checkUserDataValidation = {
    body: Joi.object().keys({
        username: Joi.string().allow('').optional(),
        mobile: Joi.string().allow('').optional(),
        email: Joi.string().allow('').optional(),
    }).or('username', 'mobile', 'email').messages({
        'object.missing': 'At least one of username, mobile, or email must be provided',
    }),
};

const resetPasswordValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': message.PROVIDE_INPUT('name'),
        }),
        password: Joi.string().min(6).required().messages({
            'any.required': message.PROVIDE_INPUT('password'),
        }),
    }),
};

const updateUserValidation = {
    params: Joi.object().keys({
        userId: Joi.string().required().messages({
            'any.required': 'User ID is required',
        }),
    }),
    body: Joi.object().keys({
        name: Joi.string().optional(),
        username: Joi.string().optional(),
        mobile: Joi.string().optional(),
        emailVerified: Joi.boolean().optional(),
        profileImage: Joi.string().optional(),
    }),
};

const getUserByIdValidation = {
    params: Joi.object().keys({
        userId: Joi.string().required().messages({
            'any.required': 'User ID is required',
            'string.empty': 'User ID cannot be empty',
        }),
    }),
};

const createProjectValidation = {
    body: Joi.object().keys({
        name: Joi.string().min(3).max(100).required().messages({
            'any.required': 'Please provide a valid project name',
            'string.min': 'Project name must be at least 3 characters long',
            'string.max': 'Project name must be at most 100 characters long',
        }),
        code: Joi.string().alphanum().min(3).max(30).required().messages({
            'any.required': 'Please provide a valid project code',
            'string.alphanum': 'Project code can only contain letters and numbers',
            'string.min': 'Project code must be at least 3 characters long',
            'string.max': 'Project code must be at most 30 characters long',
        }),
        description: Joi.string().max(500).optional().messages({
            'string.max': 'Project description must be at most 500 characters long',
        }),
    }),
};

const getProjectByIdValidation = {
    params: Joi.object().keys({
        projectId: Joi.string().required().messages({
            'any.required': 'Project ID is required',
            'string.empty': 'Project ID cannot be empty',
        }),
    }),
};

const getProjectsByIdsValidation = {
    body: Joi.object().keys({
        projectIds: Joi.array()
            .items(Joi.string().required())
            .min(1)
            .required()
            .messages({
                'any.required': 'Project IDs are required',
                'array.base': 'Project IDs must be an array',
                'array.min': 'At least one project ID must be provided',
                'string.base': 'Each project ID must be a string',
            }),
    }),
};

const updateProjectValidation = {
    params: Joi.object().keys({
        projectId: Joi.string().required().messages({
            'any.required': 'Project ID is required',
            'string.base': 'Project ID must be a string',
        }),
    }),
    body: Joi.object().keys({
        name: Joi.string().optional().messages({
            'string.base': 'Name must be a string',
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string',
        }),
        isActive: Joi.boolean().optional().messages({
            'boolean.base': 'isActive must be a boolean',
        }),
    }),
};

const deleteProjectValidation = {
    params: Joi.object().keys({
        projectId: Joi.string().required().messages({
            'any.required': 'Project ID is required',
            'string.base': 'Project ID must be a string',
        }),
    }),
};

const createPermissionValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': 'Permission name is required',
            'string.empty': 'Permission name cannot be empty',
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string',
        }),
    }),
};

const getPermissionByIdValidation = {
    params: Joi.object().keys({
        permissionId: Joi.string().required().messages({
            'any.required': 'Permission ID is required',
            'string.empty': 'Permission ID cannot be empty',
        }),
    }),
};

const getPermissionsByIdsValidation = {
    body: Joi.object().keys({
        permissionIds: Joi.array()
            .items(Joi.string().required())
            .min(1)
            .required()
            .messages({
                'any.required': 'Permission IDs are required',
                'array.base': 'Permission IDs must be an array',
                'array.min': 'At least one Permission ID must be provided',
                'string.empty': 'Permission ID cannot be empty',
            }),
    }),
};

const updatePermissionValidation = {
    params: Joi.object().keys({
        permissionId: Joi.string().required().messages({
            'any.required': 'Permission ID is required',
        }),
    }),
    body: Joi.object().keys({
        name: Joi.string().optional().messages({
            'string.base': 'Name must be a string',
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Description must be a string',
        }),
        isActive: Joi.boolean().optional(),
    }),
};

const deletePermissionValidation = {
    params: Joi.object().keys({
        permissionId: Joi.string().required().messages({
            'any.required': 'Permission ID is required',
        }),
    }),
};

const createRoleValidation = {
    body: Joi.object().keys({
        name: Joi.string().min(3).max(50).required().messages({
            'any.required': 'Role name is required',
            'string.empty': 'Role name must not be empty',
            'string.min': 'Role name must be at least 3 characters long',
            'string.max': 'Role name must be at most 50 characters long',
        }),
        code: Joi.string().alphanum().min(3).max(20).required().messages({
            'any.required': 'Role code is required',
            'string.empty': 'Role code must not be empty',
            'string.alphanum': 'Role code must only contain alphanumeric characters',
            'string.min': 'Role code must be at least 3 characters long',
            'string.max': 'Role code must be at most 20 characters long',
        }),
        description: Joi.string().optional().max(255).messages({
            'string.max': 'Description must be at most 255 characters long',
        }),
        projectCode: Joi.string().required().messages({
            'any.required': 'Project code is required',
            'string.empty': 'Project code must not be empty',
        }),
        permissions: Joi.array()
        .items(Joi.string())
        .min(0)
        .messages({
            'array.base': 'Permissions must be an array',
            'array.min': 'At least one permission must be specified',
        }),    
    }),
};

const getRoleByIdValidation = {
    params: Joi.object().keys({
        roleId: Joi.string().required().messages({
            'any.required': 'Role ID is required',
            'string.empty': 'Role ID must not be empty',
        }),
    }),
};

const getRolesByIdsValidation = {
    body: Joi.object().keys({
        roleIds: Joi.array()
            .items(Joi.string().required())
            .min(1)
            .required()
            .messages({
                'any.required': 'Role IDs are required',
                'array.min': 'At least one role ID must be provided',
                'array.base': 'Role IDs must be an array',
            }),
    }),
};

const updateRoleValidation = {
    body: Joi.object().keys({
        name: Joi.string().required().messages({
            'any.required': 'Name is required',
        }),
        code: Joi.string().required().messages({
            'any.required': 'Code is required',
        }),
        description: Joi.string().optional(),
        projectCode: Joi.string().required().messages({
            'any.required': 'Project code is required',
        }),
        permissions: Joi.array().items(Joi.string()).optional(),
        isActive: Joi.boolean().optional(),
    }),
};

const deleteRoleValidation = {
    params: Joi.object().keys({
        roleId: Joi.string().required().messages({
            'any.required': 'Role ID is required',
            'string.empty': 'Role ID cannot be empty',
        }),
    }),
};

const googleSignInValidation = {
    body: Joi.object().keys({
        googleUid: Joi.string().required().messages({
            'any.required': 'Google UID is required',
            'string.empty': 'Google UID cannot be empty',
        }),
        name: Joi.string().required().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be empty',
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
        }),
        profileImage: Joi.string().optional().uri().messages({
            'string.uri': 'Profile image must be a valid URL',
        }),
        roles: Joi.array().items(Joi.string().required()).min(1).required().messages({
            'any.required': 'At least one role is required',
            'array.min': 'At least one role must be provided',
        }),
        projectCode: Joi.string().required().messages({
            'any.required': 'Project code is required',
            'string.empty': 'Project code cannot be empty',
        }),
        ip: Joi.string().ip().required().messages({
            'any.required': 'IP address is required',
            'string.empty': 'IP address cannot be empty',
            'string.ip': 'IP address must be valid',
        }),
    }),
};

const completeProfileValidation = {
    body: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email address',
        }),
        username: Joi.string().required().messages({
            'any.required': 'Username is required',
            'string.empty': 'Username cannot be empty',
        }),
        ip: Joi.string().ip().required().messages({
            'any.required': 'IP address is required',
            'string.empty': 'IP address cannot be empty',
            'string.ip': 'IP address must be valid',
        }),
        projectCode: Joi.string().required().messages({
            'any.required': 'Project code is required',
            'string.empty': 'Project code cannot be empty',
        }),
    }),
};

const validationSchema = {
    signUpValidation,
    logInValidation,
    resendOtpValidation,
    otpVerifyValidation,
    createRoleValidation,
    updateRoleValidation,
    deleteRoleValidation,
    updateUserValidation,
    getUserByIdValidation,
    getRoleByIdValidation,
    googleSignInValidation,
    resetPasswordValidation,
    deleteProjectValidation,
    checkUserDataValidation,
    updateProjectValidation,
    createProjectValidation,
    getRolesByIdsValidation,
    forgotPasswordValidation,
    getProjectByIdValidation,
    completeProfileValidation,
    getProjectsByIdsValidation,
    updatePermissionValidation,
    deletePermissionValidation,
    createPermissionValidation,
    getPermissionByIdValidation,
    getPermissionsByIdsValidation,
};

export default validationSchema;