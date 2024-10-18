import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { email, username, password, role } = body;
    return this.authService.registerUser(email, username, password, role);
  }

  @Post('login')
  async login(@Body() body: any, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    
    if (user) {
      session.userId = user.id;  // Store user ID in session
      return { message: 'Login successful', user };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  @UseGuards(AuthGuard('local'))
  @Get('protected')
  getProtectedData(@Session() session: any) {
    if (!session.userId) {
      throw new UnauthorizedException('Not logged in');
    }
    return { message: 'This is protected data' };
  }

}
