import { User } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

export enum ROLE {
  ADMIN,
  EDITOR,
}

@Schema()
export class UserModel implements User {
  @Prop({ required: false, type: Types.ObjectId })
  id: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: ROLE.EDITOR, type: 'number' })
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
