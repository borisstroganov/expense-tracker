export type User = {
    id: string,
    email: string,
    name: string,
    password: string,
}

export type Expense = {
    id: string,
    amount: number,
    type: string,
    description: string,
    date: string,
    email: string,
}

export type RegisterRequest = {
    email: string;
    name: string;
    password: string;
}

export type RegisterResponse = {
    email: string;
    name: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    email: string;
    name: string;
    token: string;
}

export type ChangePasswordRequest = {
    password: string,
    newPassword: string,
    confirmPassword: string,
}

export type ChangePasswordResponse = {
    email: string,
}
