import { User } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel implements User {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
