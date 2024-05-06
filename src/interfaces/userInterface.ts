export interface CreateUserRequest {
    email: string;
    username: string;
    password: string;
    phone?: string;
    image?: string;
}

export interface CreateUserResponse {
    user: any; 
    message: string;
}