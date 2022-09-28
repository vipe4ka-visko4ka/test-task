import { Module } from '@nestjs/common';

import { TransactionsModule } from '../transactions/transactions.module';
import { SeedsService } from './seeds.service';
import { TransactionsSeeder } from './transactions/transactions.seeder';

@Module({
  imports: [TransactionsModule],
  providers: [SeedsService, TransactionsSeeder],
})
export class SeedsModule {}
