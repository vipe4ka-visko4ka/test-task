import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedsModule } from './seeds/seeds.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TransactionsModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
