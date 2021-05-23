import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IPrincingRepository from '@modules/pricing/repositories/IPricingRepository';

interface IRequest {
  orig: string;
  dest : string;
}

@injectable()
class DeletePrincingService {

  constructor(
    @inject(Types.PricingRepository) private princingRepository: IPrincingRepository,
  ) {}

  public async execute({ orig, dest }: IRequest): Promise<boolean> {
    const princing = await this.princingRepository.find({ origin: orig, destination: dest, enabled: true });
    if (!princing) throw new AppError('Princing does not exist', 404);

    const response = await this.princingRepository.update(princing, { enabled: false });
    if (!response) throw new AppError('Could not delete Princing', 502);

    return !response.enabled;
  }
}

export default DeletePrincingService;
