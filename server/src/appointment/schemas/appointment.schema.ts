import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Event {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  event_date: Date;

  @Prop()
  location: string;

  @Prop()
  status: string;

  @Prop()
  rejected_reason: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
