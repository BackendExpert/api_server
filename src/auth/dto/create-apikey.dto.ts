import { IsEmail } from "class-validator";

export class CreateAPIKeyDto {
    @IsEmail()
    email!: string;
}