import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import Pricing from '@entities/Pricing';
import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

// repositories
import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';

// validators
import UpdatePricingValidator from '@modules/pricing/infra/http/validators/UpdatePricingValidator';

interface IRequest {
  orig: string;
  dest : string;
  data: Z.infer<typeof UpdatePricingValidator>;
}

@injectable()
class UpdatePricingService {

  constructor(
    @inject(Types.PricingRepository) private pricingRepository: IPricingRepository,
  ) {}

  public async execute({ orig, dest, data }: IRequest): Promise<Pricing> {
    // check if pricing exist
    const pricing = await this.pricingRepository.find({ origin: orig, destination: dest }, ['origin_', 'destination_']);
    if (!pricing) throw new AppError('Pricing does not exist', 404);

    return this.pricingRepository.update(pricing, data);
  }
}

export default UpdatePricingService;
