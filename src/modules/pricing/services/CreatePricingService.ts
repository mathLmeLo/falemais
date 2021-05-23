import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import Pricing from '@entities/Pricing';

import IPricingRepository from '@modules/pricing/repositories/IPricingRepository';
import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';

import CreatePricingValidator from '@modules/pricing/infra/http/validators/CreatePricingValidator';

interface IRequest {
  data: Z.infer<typeof CreatePricingValidator>;
}

@injectable()
class CreatePricingService {

  constructor(
    @inject(Types.AreaCodeRepository) private areaCodeRepository: IAreaCodeRepository,
    @inject(Types.PricingRepository) private pricingRepository: IPricingRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<Pricing> {
    const exists = await this.pricingRepository.find({ origin: data.origin, destination: data.destination });
    if (exists) throw new AppError('Pricing already Exists', 409);

    const origin = await this.areaCodeRepository.find({ ddd: data.origin, enabled: true });
    if (!origin) throw new AppError('Origin AreaCode does not exist', 404);

    const destination = await this.areaCodeRepository.find({ ddd: data.destination, enabled: true });
    if (!destination) throw new AppError('Destination AreaCode does not exist', 404);

    return this.pricingRepository.create({ origin: data.origin, destination: data.destination, price: data.price });
  }
}

export default CreatePricingService;
