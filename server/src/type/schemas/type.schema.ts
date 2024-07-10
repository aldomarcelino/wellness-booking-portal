import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Type {
  @Prop()
  name: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
