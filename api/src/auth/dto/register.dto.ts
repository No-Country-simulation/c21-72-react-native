import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

// import {isEmail}
export class RegisterDto{
    @Transform(({value}) =>value.trim()) // callback para validar que no venga espacios
    @IsString()
    @MinLength(4)
    name:string;

    @IsEmail()
    email:string;

    @Transform(({value}) =>value.trim())
    @IsString()
    @MinLength(8)
    password:string;
}