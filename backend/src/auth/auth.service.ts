import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BuyersService } from 'src/buyers/buyers.service';
import { SellersService } from 'src/sellers/sellers.service';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly buyersService: BuyersService,
        private readonly sellersService: SellersService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(
        username: string,
        password: string,
        user_type: string
    ): Promise<{ access_token: any }> {

        //TODO: change to a user interface
        let user: any
        if (user_type === 'buyer') {
            const buyer = await this.buyersService.findOneByUserName(username)
            const { buyer_id, ...rest } = buyer
            user = {
                "user_id": buyer_id,
                ...rest
            }

        } else {
            const seller = await this.sellersService.findOneByUsername(username)
            const { seller_id, ...rest } = seller
            user = {
                "user_id": seller_id,
                ...rest
            }
        }

        if (!user)
            throw new NotFoundException

        const passwordComparison = await compare(password, user.password)

        if (passwordComparison === false)
            throw new UnauthorizedException()


        const payload = { sub: user.user_id, role: user.user_type }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }


}
