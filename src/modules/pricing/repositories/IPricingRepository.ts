import Pricing from '@entities/Pricing';
import ICreatePricingDTO from '@modules/pricing/dtos/ICreatePricingDTO';
import IPricingFiltersDTO from '@modules/pricing/dtos/IPricingFiltersDTO';
import IUpdatePricingDTO from '@modules/pricing/dtos/IUpdatePricingDTO';

interface IPricingRepository {
  create(data: ICreatePricingDTO): Promise<Pricing | undefined>;
  find(where: object | object[], relations?: string[]): Promise<Pricing | undefined>;
  list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<Pricing[] | undefined>;
  update(pricing: Pricing, data: IUpdatePricingDTO): Promise<Pricing | undefined>
  delete(pricing: Pricing): Promise<boolean>;
  filter(filters: IPricingFiltersDTO): Promise<Pricing[] | undefined>;
}

export default IPricingRepository;
