import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { UUID } from 'crypto';
import { RegisterRequestDto } from 'src/auth/dtos/register-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUserName(name: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ name: name });
  }

  create(user: RegisterRequestDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(userId: number, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }
}
