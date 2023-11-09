import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  register(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto).save();
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException('user not exists');
    }
    //  convert to hash to compare with password
    const userHash = crypto
      .createHash('md5')
      .update(loginDto.password)
      .digest('hex');

    if (userHash !== user.password)
      throw new BadRequestException('Incorrect Password');

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      roles: user.roles,
    });
    return { accessToken };
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }
}
