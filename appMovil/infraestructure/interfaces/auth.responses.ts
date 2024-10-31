export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: UserResponse;
    rol: string;
}

interface UserResponse{
    email: string;
    name: string;
}