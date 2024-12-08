import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [JwtModule.register({
        secret: `O<[^MMp2Vn#9p2crgi9t&S_u#<lde8_A`
    }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController]
})
export class AuthModule { }
