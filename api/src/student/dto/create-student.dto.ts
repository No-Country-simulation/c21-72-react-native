import { IsString, IsNotEmpty, IsEmail, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class FamilyMemberDto {
    @IsNotEmpty()
    personId: number;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsOptional()
    @IsEmail()
    email_address?: string;

    @IsString()
    @IsNotEmpty()
    male: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}




export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    admission_number: string;

    @IsString()
    @IsNotEmpty()
    academic_year: number;

    @IsString()
    @IsNotEmpty()
    date_of_admission: Date;

    @IsOptional()
    @IsEmail()
    email_address?: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    grado: string;

    @IsString()
    @IsNotEmpty()
    salon: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FamilyMemberDto)
    family: FamilyMemberDto[];
}
