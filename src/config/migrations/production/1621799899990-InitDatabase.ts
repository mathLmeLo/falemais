import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1621799899990 implements MigrationInterface {
    name = 'InitDatabase1621799899990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."pricing" ("origin" character(3) NOT NULL, "destination" character(3) NOT NULL, "price" numeric(5,2) NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b09bb56a632674422ac252ae0e7" PRIMARY KEY ("origin", "destination"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pricing_pkey" ON "public"."pricing" ("origin", "destination") `);
        await queryRunner.query(`CREATE TABLE "public"."areaCode" ("ddd" character(3) NOT NULL, "uf" character(2) NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_34b20a6bda86d513c565ab23600" PRIMARY KEY ("ddd"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "areaCode_pkey" ON "public"."areaCode" ("ddd") `);
        await queryRunner.query(`ALTER TABLE "public"."pricing" ADD CONSTRAINT "FK_6f5133b32108defd83ad9a5db5d" FOREIGN KEY ("origin") REFERENCES "public"."areaCode"("ddd") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."pricing" ADD CONSTRAINT "FK_9c1447bc43da9bfd94d3f9e88be" FOREIGN KEY ("destination") REFERENCES "public"."areaCode"("ddd") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."pricing" DROP CONSTRAINT "FK_9c1447bc43da9bfd94d3f9e88be"`);
        await queryRunner.query(`ALTER TABLE "public"."pricing" DROP CONSTRAINT "FK_6f5133b32108defd83ad9a5db5d"`);
        await queryRunner.query(`DROP INDEX "public"."areaCode_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."areaCode"`);
        await queryRunner.query(`DROP INDEX "public"."pricing_pkey"`);
        await queryRunner.query(`DROP TABLE "public"."pricing"`);
    }

}
