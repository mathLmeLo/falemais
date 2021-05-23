import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';
import AreaCode from '@entities/AreaCode';
import ICreateAreaCodeDTO from '@modules/areaCode/dtos/ICreateAreaCodeDTO';
import IUpdateAreaCodeDTO from '@modules/areaCode/dtos/IUpdateAreaCodeDTO';
import IAreaCodeFiltersDTO from '@modules/areaCode/dtos/IAreaCodeFiltersDTO';

@injectable()
class AreaCodeRepository implements IAreaCodeRepository {
  private ormRepository = getConnection().getRepository(AreaCode)

  public async create(data: ICreateAreaCodeDTO): Promise<AreaCode | undefined> {
    const areaCode = this.ormRepository.create(data);
    return this.ormRepository.save(areaCode).catch(() => undefined);
  }

  public async find(where: object | object[], relations?: string[]): Promise<AreaCode | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where: object | object[], relations?: string[], take?: number, skip?: number): Promise<AreaCode[] | undefined> {
    return this.ormRepository.find({ where, relations, take, skip }).catch(() => undefined);
  }

  public async update(areaCode: AreaCode, data: IUpdateAreaCodeDTO): Promise<AreaCode | undefined> {
    this.ormRepository.merge(areaCode, data);
    return this.ormRepository.save(areaCode);
  }

  public async delete(areaCode: AreaCode): Promise<boolean> {
    return this.ormRepository.delete(areaCode).then(() => true).catch(() => false);
  }

  public async filter(filters: IAreaCodeFiltersDTO): Promise<AreaCode[] | undefined> {
    const { where, page, order } = filters;

    const queryBuilder = this.ormRepository
      .createQueryBuilder('areaCode')
      .where('areaCode.enabled = :enabled', { enabled: where && typeof where.enabled !== 'undefined' ? where.enabled : true });

    if (where) {
      if (where.ddd) { queryBuilder.andWhere('areaCode.ddd = :ddd', { ddd: where.ddd }); }
      if (where.uf) { queryBuilder.andWhere('areaCode.uf = :uf', { uf: where.uf }); }
    }

    if (page) { queryBuilder.offset(page.offset ? page.offset * (page.size || 30) : 0).limit(page.count ? (page.size || 30) * page.count : 0); }

    // order
    if (order && order.by && order.dsc) {
      queryBuilder.orderBy(`areaCode.${order.by}`, 'DESC');
    } else if (order && order.by) {
      queryBuilder.orderBy(`areaCode.${order.by}`);
    } else {
      queryBuilder.orderBy('areaCode.created');
    }

    return queryBuilder.getMany();
  }
}

export default AreaCodeRepository;
