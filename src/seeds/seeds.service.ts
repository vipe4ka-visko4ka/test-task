import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

import { ISeeder } from '../seeds/seeder';
import { TransactionsSeeder } from './transactions/transactions.seeder';

@Injectable()
export class SeedsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedsService.name);
  private readonly seeders: ISeeder[] = [this.transactionsSeeder];

  constructor(private readonly transactionsSeeder: TransactionsSeeder) {}

  async onApplicationBootstrap() {
    for (const seeder of this.seeders) await this.seed(seeder);
  }

  private async seed(seeder: ISeeder) {
    if (await seeder.isSeeded()) {
      this.logger.log(`${seeder.constructor.name} already seeded`);
      return;
    }

    await seeder.run();
    this.logger.log(`${seeder.constructor.name} seeded successfully`);
  }
}
