import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
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
  create(user: RegisterRequestDto): Promise<User> {
    return this.usersRepository.save(user);
  }
}
