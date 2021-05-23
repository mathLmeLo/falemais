import AreaCode from '@entities/AreaCode';
import ICreateAreaCodeDTO from '@modules/areaCode/dtos/ICreateAreaCodeDTO';
import IAreaCodeFiltersDTO from '@modules/areaCode/dtos/IAreaCodeFiltersDTO';
import IUpdateAreaCodeDTO from '@modules/areaCode/dtos/IUpdateAreaCodeDTO';

interface IAreaCodeRepository {
  create(data: ICreateAreaCodeDTO): Promise<AreaCode | undefined>;
  find(where: object | object[], relations?: string[]): Promise<AreaCode | undefined>;
  list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<AreaCode[] | undefined>;
  update(areaCode: AreaCode, data: IUpdateAreaCodeDTO): Promise<AreaCode | undefined>
  delete(areaCode: AreaCode): Promise<boolean>;
  filter(filters: IAreaCodeFiltersDTO): Promise<AreaCode[] | undefined>;
}

export default IAreaCodeRepository;
