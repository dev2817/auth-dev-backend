export type CreateUserInput = {
    name: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    emailVerified?: boolean;
    profileImage?: string;
    roles?: string[];
}