import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';

import IResponse from '@modules/pricing/responses/IFindPricingResponse';

interface IRequest {
  orig: string;
  dest : string;
}

@injectable()
class FindPricingService {

  constructor(
    @inject(Types.PricingRepository) private pricingRepository: IPricingRepository,
  ) {}

  public async execute({ orig, dest }: IRequest): Promise<IResponse> {
    const pricing = await this.pricingRepository.find({ origin: orig, destination: dest, enabled: true }, ['origin_', 'destination_']);
    if (!pricing) throw new AppError('Pricing does not exist', 404);

    return {
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
  }
}

export default FindPricingService;
