import type { AuthResponseDto } from "../dto/auth-response-dto";
import type { LoginDto } from "../dto/login-dto";

export interface IAutenticacionRepository{
    login(data:LoginDto): Promise<AuthResponseDto>
}