export type CreateUserInput = {
    name: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    roles: string[];
    projectCode: string;
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
    projectCode: string;
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
    projectCode: string;
    permissions?: string[];
    isActive?: boolean
};

export type OtpInput = {
    name: string
    otp: string;
    forgotPassword?: boolean;
    verify?: boolean;
    ip: string;
    projectCode: string;
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

export type UserCheckData = {
    username?: "";
    mobile?: "";
    email?: "";
}

export type GoogleSignData = {
    googleUid: string;
    name: string;
    email: string;
    profileImage?: string;
    roles: string[];
    projectCode: string;
    ip: string;
}

export type LogInInput = {
    name: string;
    password: string;
    ip: string;
    projectCode: string;
}

export type CompleteProfileInput = {
    email: string;
    username: string;
    ip: string;
    projectCode: string;
}