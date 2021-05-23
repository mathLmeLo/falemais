import { injectable, inject } from 'inversify';

import AppError from '@common/errors/AppError';
import Types from '@common/container/Types';

import IAreaCodeRepository from '@modules/areaCode/repositories/IAreaCodeRepository';

interface IRequest {
  ddd: string;
}

@injectable()
class DeleteAreaCodeService {

  constructor(
    @inject(Types.AreaCodeRepository) private areaCodeRepository: IAreaCodeRepository,
  ) {}

  public async execute({ ddd }: IRequest): Promise<boolean> {
    const areaCode = await this.areaCodeRepository.find({ ddd, enabled: true });
    if (!areaCode) throw new AppError('AreaCode does not exist', 404);

    const response = await this.areaCodeRepository.update(areaCode, { enabled: false });
    if (!response) throw new AppError('Could not delete AreaCode', 502);

    return !response.enabled;
  }
}

export default DeleteAreaCodeService;
