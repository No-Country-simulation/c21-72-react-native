import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserParentDto {
    @IsNumber()
    @IsOptional()
    personId?: number; 

    @IsNumber()
    @IsOptional()
    id?: number; 

    @IsString()
    @IsNotEmpty()
    type: string;
    
    @IsString()
    @IsNotEmpty()
    admission_number: string;

    @IsNumber()
    @IsOptional()
    academic_year: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    date_of_admission: Date;

    @IsOptional()
    @IsEmail()
    email_address?: string;

    @IsString()
    @IsNotEmpty()
    grado: string;

    @IsString()
    @IsNotEmpty()
    salon: string;

    @IsNumber()
    @IsOptional()
    userId?: number; 
}