/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import AreaCodeSeed from '@config/seeds/AreaCodeSeed.json';

export class SeedAreaCode1621799899991 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('areaCode').save(AreaCodeSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
