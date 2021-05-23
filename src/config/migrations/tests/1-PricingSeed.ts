/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import PricingSeed from '@config/seeds/PricingSeed.json';

export class SeedPricing1611163640923 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('pricing').save(PricingSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
