import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0,
        minNumbers: 0
    })
    password: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;
}