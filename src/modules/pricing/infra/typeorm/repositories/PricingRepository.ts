import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';
import Pricing from '@entities/Pricing';
import ICreatePricingDTO from '@modules/pricing/dtos/ICreatePricingDTO';
import IUpdatePricingDTO from '@modules/pricing/dtos/IUpdatePricingDTO';
import IPricingFiltersDTO from '@modules/pricing/dtos/IPricingFiltersDTO';

@injectable()
class PricingRepository implements IPricingRepository {
  private ormRepository = getConnection().getRepository(Pricing)

  public async create(data: ICreatePricingDTO): Promise<Pricing | undefined> {
    const pricing = this.ormRepository.create(data);
    return this.ormRepository.save(pricing).catch(() => undefined);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Pricing | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where: object | object[], relations?: string[], take?: number, skip?: number): Promise<Pricing[] | undefined> {
    return this.ormRepository.find({ where, relations, take, skip }).catch(() => undefined);
  }

  public async update(pricing: Pricing, data: IUpdatePricingDTO): Promise<Pricing | undefined> {
    this.ormRepository.merge(pricing, data);
    return this.ormRepository.save(pricing);
  }

  public async delete(pricing: Pricing): Promise<boolean> {
    return this.ormRepository.delete(pricing).then(() => true).catch(() => false);
  }

  public async filter(filters: IPricingFiltersDTO): Promise<Pricing[] | undefined> {
    const { where, page, order } = filters;

    const queryBuilder = this.ormRepository
      .createQueryBuilder('pricing')
      .innerJoinAndSelect('pricing.origin_', 'originRef')
      .innerJoinAndSelect('pricing.destination_', 'destinationRef')
      .where('pricing.enabled = :enabled', { enabled: where && typeof where.enabled !== 'undefined' ? where.enabled : true });

    if (where) {
      if (where.origin) { queryBuilder.andWhere('pricing.origin = :origin', { origin: where.origin }); }
      if (where.destination) { queryBuilder.andWhere('pricing.destination = :destination', { destination: where.destination }); }
      if (where.price) { queryBuilder.andWhere('pricing.price = :price', { price: where.price }); }
    }

    if (page) { queryBuilder.offset(page.offset ? page.offset * (page.size || 30) : 0).limit(page.count ? (page.size || 30) * page.count : 0); }

    // order
    if (order && order.by && order.dsc) {
      queryBuilder.orderBy(`pricing.${order.by}`, 'DESC');
    } else if (order && order.by) {
      queryBuilder.orderBy(`pricing.${order.by}`);
    } else {
      queryBuilder.orderBy('pricing.price');
    }

    return queryBuilder.getMany();
  }
}

export default PricingRepository;
