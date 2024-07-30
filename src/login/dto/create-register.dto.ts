import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateRegisterDto {
    @IsString()
    @MinLength(1)
    name: string 

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6)
    //@Transform(({value}) => value.trim())
    password: string

    //the value.trim make sure that this password doesn't have blank spaces when, for example, an user do a copy-paste of his password
}
