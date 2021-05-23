import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Pricing from '@entities/Pricing';

@Index('areaCode_pkey', ['ddd'], { unique: true })
@Entity('areaCode', { schema: 'public' })
class AreaCode {
  @PrimaryColumn()
  @Column('char', { name: 'ddd', length: 3, primary: true })
  ddd: string;

  @Column('char', { name: 'uf', length: 2 })
  uf: string;

  @Exclude()
  @Column('boolean', { name: 'enabled', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'time with time zone' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'time with time zone' })
  updated: Date;

  @OneToMany(() => Pricing, (pricing) => pricing.origin_)
  originPricings: Pricing[];

  @OneToMany(() => Pricing, (pricing) => pricing.destination_)
  destinationPricings: Pricing[];
}

export default AreaCode;
