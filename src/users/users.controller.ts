import {
  Controller,
  Get,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiAuthPermission } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  
  @Get('welcome')
  @ApiAuthPermission() 
  @ApiBearerAuth()
    async welcome(
      @Request() req,
    ): Promise<{ message: string; user: any }> {
      return { message: 'Welcome!', user: req.user };
    }
}
