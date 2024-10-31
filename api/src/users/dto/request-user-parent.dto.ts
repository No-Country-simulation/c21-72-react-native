import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RequestUserParentDto {
    @IsNumber()
    @IsOptional()
    personId?: number; 
    
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    type: string;
    
    @IsString()
    @IsNotEmpty()
    admission_number: string;
}