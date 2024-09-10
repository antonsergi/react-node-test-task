import { Body, Controller, HttpCode, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('sign-in')
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() signInDto: SignInDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const accessToken = await this.authService.signIn(signInDto.email, signInDto.password);

        response.cookie('jwt', accessToken, { httpOnly: true });
    }

    @Post('sign-out')
    @HttpCode(HttpStatus.OK)
    async signOut(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
    }
}
