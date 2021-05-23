import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import AreaCode from '@entities/AreaCode';

import ColumnNumericTransformer from '@modules/pricing/utils/ColumnNumericTransformer';

@Index('pricing_pkey', ['origin', 'destination'], { unique: true })
@Entity('pricing', { schema: 'public' })
class Pricing {
  @PrimaryColumn()
  @Column('char', { name: 'origin', length: 3, primary: true })
  origin: string;

  @ManyToOne(() => AreaCode, (areaCode) => areaCode.originPricings)
  @JoinColumn([{ name: 'origin', referencedColumnName: 'ddd' }])
  origin_: AreaCode;

  @PrimaryColumn()
  @Column('char', { name: 'destination', length: 3, primary: true })
  destination: string;

  @ManyToOne(() => AreaCode, (areaCode) => areaCode.destinationPricings)
  @JoinColumn([{ name: 'destination', referencedColumnName: 'ddd' }])
  destination_: AreaCode;

  @Column('decimal', { name: 'price', scale: 2, precision: 5, transformer: new ColumnNumericTransformer() })
  price: number;

  @Exclude()
  @Column('boolean', { name: 'enabled', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'time with time zone' })
  created: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'time with time zone' })
  updated: Date;
}

export default Pricing;
