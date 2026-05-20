import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ApiKeyDocument = ApiKey & Document;

@Schema({ timestamps: true })

export class ApiKey {
    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    apikey!: string;

    @Prop({ required: true, type: Date})
    issued_at!: Date;

    @Prop({ required: true, default: 0, type: Number})
    reqeuests!: number
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey)