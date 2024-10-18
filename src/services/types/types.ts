export type CreateUserInput = {
    name: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    emailVerified?: boolean;
    profileImage?: string;
    roles: string[];
    projectId: string;
}

export type UpdateUserInput = {
    name?: string;
    username?: string;
    mobile?: string;
    emailVerified?: boolean;
    profileImage?: string;
}

export type ProjectInput = {
    name: string;
    code: string;
    description?: string
}

export type PermissionInput = {
    name: string;
    description?: string
}

export type RoleInput = {
    name: string;
    code: string;
    description?: string;
    project: string;
    permissions: string[];
};

export type UpdateProjectInput = {
    name: string;
    description?: string;
    isActive?: boolean;
}

export type UpdatePermissionInput = {
    name: string;
    description?: string;
    isActive?: boolean;
}

export type UpdateRoleInput = {
    name: string;
    code: string;
    description?: string;
    project: string;
    permissions?: string[];
    isActive?: boolean
};

export type OtpInput = {
    name: string
    otp: string;
    forgotPassword?: boolean;
    verify?: boolean;
    ip: string;
    projectId: string;
}

export type ResetPasswordInput = {
    name: string;
    password: string;
}

export type UpdateDeviceGenerateTokenInput = {
    ip: string;
    roleId: string;
    userId: string;
}