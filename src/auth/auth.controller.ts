import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { RegisterResponseDTO } from './dtos/register-response.dto';
import { Public } from './decorators/public.decorator';
import { LoginRequestDto } from './dtos/login-request.dto';
import { ApiAuthPermission } from './decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login( @Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(loginRequestDto);
  }

  @Post('register')
  @Public()
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return await this.authService.register(registerBody);
  }
  
}
