import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto.ts';
import { AuthGuard } from './auth.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/enums/role.enum';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() body: SignInDto) {

        return this.authService.signIn(body.username, body.password, body.user_type)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Seller)
    @Get('test')
    getProfile(@Request() req) {
        return req.user
    }
}
