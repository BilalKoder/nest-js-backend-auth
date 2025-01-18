import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { AccessToken } from './types/AccessToken';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(loginRequestDto: LoginRequestDto): Promise<AccessToken> {
    // const payload = { email: user.email, id: user.id };
    const user = await this.validateUser(loginRequestDto.email, loginRequestDto.password)
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign({ ...payload });
    return { 
        data: {
          access_token: token 
        },
        status : 200
      };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const recentCreatedUser = await this.usersService.create(newUser);
    const payload = { id: recentCreatedUser.id, email: recentCreatedUser.email };
    const token = this.jwtService.sign({ ...payload });
    return { 
      data: {
        access_token: token 
      },
      status : 200
    };
  }
}
