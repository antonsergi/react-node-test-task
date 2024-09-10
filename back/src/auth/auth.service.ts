import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jswService: JwtService,
    ) {}

    async signIn(
        email: string,
        password: string,
    ) {
       const user = await this.userService.findByEmail(email);
       if (!user) {
           throw new UnauthorizedException('Invalid credentials');
       }

       const arePasswordsSame = await bcrypt.compare(password, user.password);
       if (!arePasswordsSame) {
           throw new UnauthorizedException('Invalid credentials');
       }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return this.jswService.signAsync(payload);
    }
}
