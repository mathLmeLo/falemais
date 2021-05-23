import { injectable, inject } from 'inversify';
import * as Z from 'zod';

import AreaCode from '@entities/AreaCode';
import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

// repositories
import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';

// validators
import UpdateAreaCodeValidator from '@modules/areaCode/infra/http/validators/UpdateAreaCodeValidator';

interface IRequest {
  ddd: string;
  data: Z.infer<typeof UpdateAreaCodeValidator>;
}

@injectable()
class UpdateAreaCodeService {

  constructor(
    @inject(Types.AreaCodeRepository) private areaCodeRepository: IAreaCodeRepository,
  ) {}

  public async execute({ ddd, data }: IRequest): Promise<AreaCode> {
    // check if AreaCode exist
    const areaCode = await this.areaCodeRepository.find({ ddd });
    if (!areaCode) throw new AppError('AreaCode does not exist', 404);

    return this.areaCodeRepository.update(areaCode, data);
  }
}

export default UpdateAreaCodeService;
