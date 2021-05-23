import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';

import ListPricingsValidator from '@modules/pricing/infra/http/validators/ListPricingValidator';
import IResponse from '@modules/pricing/responses/IListPricingResponse';

interface IRequest {
  data: Z.infer<typeof ListPricingsValidator>;
}

@injectable()
class ListPricingService {

  constructor(
    @inject(Types.PricingRepository) private pricingRepository: IPricingRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<IResponse> {
    const { filter, pageSize, pageOffSet, pageCount, orderAttribute, orderType } = data;

    const pricings = await this.pricingRepository.filter({
      where: filter,
      page: { size: pageSize, count: pageCount, offset: pageOffSet },
      order: { by: orderAttribute, dsc: orderType === 'DESC' },
    });

    if (!pricings) throw new AppError('Could not find any Pricings', 404);

    const results = pricings.map((pricing, i) => {

      const index = {
        page: Math.trunc((i / (data.pageSize || 30)) + (data.pageOffSet || 0)),
        index: (i % (data.pageSize || 30)),
      };

      return {
        index,
        pricing: {
          price: pricing.price,
          created: pricing.created,
          enabled: pricing.enabled,
        },
        origin: {
          ddd: pricing.origin_.ddd,
          uf: pricing.origin_.uf,
        },
        destination: {
          ddd: pricing.destination_.ddd,
          uf: pricing.destination_.uf,
        },
      };
    });

    const response: IResponse = {
      pageSize: data.pageSize || 30,
      totalItems: results.length,
      results,
    };

    return response;
  }

}

export default ListPricingService;
