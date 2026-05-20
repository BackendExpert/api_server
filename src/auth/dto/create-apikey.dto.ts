import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateAPIKeyDto {
    @IsEmail()
    email!: string;

    @IsNumber()
    reqeuests!: number;
}