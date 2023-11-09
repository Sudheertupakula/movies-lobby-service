import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Role } from 'src/shared/role.enum';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  this.password = crypto.createHash('md5').update(this.password).digest('hex');
  next();
});
