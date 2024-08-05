export interface CreateUser {
    email: string;
    password: string;
    passwordConfirmation: string;
    roleId?: number;
}

export interface User{
    id?: string;
    email: string;
    roleId?: string;
    role: any;
}