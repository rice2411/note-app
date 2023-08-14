import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [],
})
export class AuthModule {}
