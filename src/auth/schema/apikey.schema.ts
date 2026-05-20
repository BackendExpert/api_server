import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ApiKeyDocument = ApiKey & Document;

@Schema({ timestamps: true })

export class ApiKey {

}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey)