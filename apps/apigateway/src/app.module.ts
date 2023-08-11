import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [AuthModule, UserModule, QuoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
