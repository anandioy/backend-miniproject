export interface User {
    email: string;
    username: string;
    password: string;
    isVerified: Boolean;
    phone?: string;
    image?: string;
    
}

export interface CreateUserResponse {
    user: string; 
    message: string;
}