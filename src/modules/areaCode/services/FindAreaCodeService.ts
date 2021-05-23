import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';

import IResponse from '@modules/areaCode/responses/IFindAreaCodeResponse';

interface IRequest {
  ddd: string;
}

@injectable()
class FindAreaCodeService {

  constructor(
    @inject(Types.AreaCodeRepository) private areaCodeRepository: IAreaCodeRepository,
  ) {}

  public async execute({ ddd }: IRequest): Promise<IResponse> {
    const areaCode = await this.areaCodeRepository.find({ ddd, enabled: true });
    if (!areaCode) throw new AppError('AreaCode does not exist', 404);

    return {
      areaCode: {
        ddd: areaCode.ddd,
        uf: areaCode.uf,
        created: areaCode.created,
        enabled: areaCode.enabled,
      },
    };
  }
}

export default FindAreaCodeService;
