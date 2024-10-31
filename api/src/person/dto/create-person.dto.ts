import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
    @IsNotEmpty()
    personId: number;

    @IsString()
    @IsNotEmpty()
    full_name: string;
    

    @IsString()
    @IsNotEmpty()
    last_name: string;
    
    @IsString()
    @IsOptional()
    email_address: string;

    @IsString()
    @IsNotEmpty()
    address: string;
    
    @IsString()
    @IsNotEmpty()
    male: string

    @IsString()
    @IsOptional()
    account: string
    
    @IsOptional()
    deleteAt: Date;
    
    @IsString()
    @IsNotEmpty()
    type: string;
}


