import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateAPIKeyDto {
    @IsEmail()
    email!: string;

    @IsString()
    apikey!: string;

    @IsNumber()
    reqeuests!: number;
}